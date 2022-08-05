from asyncore import poll
from datetime import date, datetime
from os import link
from turtle import st
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.urls import is_valid_path

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from rest_framework.parsers import JSONParser

from django.db.models import F


from goPoll.models import Poll, Votes, Options
from goPoll.serializers import PollSerializer, VotesSerializer, OptionsSerializer

# Create your views here.

# @api_view(['POST'])
def index(request):   
    return render(request, 'index.html')


@api_view(['POST'])
def createPoll(request):

    def getRandomLink():
        link_prefix = 'vgpr'
        today = datetime.now()
        day = today.day
        month = today.month
        year = today.year
        second = today.second
        link = link_prefix+str(day)+str(month)+str(year)+str(second)
        return link
    
    link = getRandomLink()
        
    poll_data = {
        'userMail': request.POST['userMail'],
        'pollName': request.POST['pollName'],
        'pollBody': request.POST['pollBody'],
        'pollLink': link,
        'pollCloseAt': request.POST['pollCloseAt'],
        'anonymous': request.POST['anonymous']
    }
    
    
    poll_options_array = request.POST['pollOptions'].split('#')
    if (len(poll_options_array) > 1):
        poll_options_array.pop(0)
        
    if request.method == 'POST':
        poll_serializer = PollSerializer(data = poll_data)
        if poll_serializer.is_valid():
            try:
                poll_serializer.save()
                pollID = poll_serializer.data['id']
                # return Response(data = poll_serializer.data, status = status.HTTP_201_CREATED)
            except Exception as e:
                return Response(data = e, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return JsonResponse({"data": "Something went wrong", "status": status.HTTP_500_INTERNAL_SERVER_ERROR})
        
        try:
            for option in poll_options_array:
                option_data = {'pollID': pollID,
                                'optionName': option}
                option_serializer = OptionsSerializer(data=option_data)
                if option_serializer.is_valid():
                    option_serializer.save()
            return Response(data = 'Poll created', status = status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"data": "Something went wrong", "status": status.HTTP_500_INTERNAL_SERVER_ERROR})


        

                

@api_view(['GET'])
def viewPolls(request, userMail):
    if request.method == 'GET':
        try:
            polls = Poll.objects.filter(userMail=userMail)
            serializer = PollSerializer(polls, many=True)
            return JsonResponse({"data": serializer.data, "status" : status.HTTP_200_OK})
        except:
            return JsonResponse({"data": "Can't retrieve data at this time", "status": status.HTTP_500_INTERNAL_SERVER_ERROR})
        
        
@api_view(['GET'])
def viewAllPolls(request):
    if request.method == 'GET':
        try:
            polls = Poll.objects.all()
            serializer = PollSerializer(polls, many=True)
            return JsonResponse({"data": serializer.data, "status": status.HTTP_200_OK})
        except:
            return JsonResponse({"data": "Can't retrieve data at this time", "status": status.HTTP_500_INTERNAL_SERVER_ERROR})


@api_view(['GET'])
def viewAllVotes(request):
    if request.method == 'GET':
        try:
            votes = Votes.objects.all()
            serializer = VotesSerializer(votes, many=True)
            return JsonResponse({"data": serializer.data, "status": status.HTTP_200_OK})
        except:
            return JsonResponse({"data": "Can't retrieve data at this time", "status": status.HTTP_500_INTERNAL_SERVER_ERROR})

    
@api_view(['GET'])
def viewAllOptions(request):
    if request.method == 'GET':
        try:
            options = Options.objects.all()
            serializer = OptionsSerializer(options, many=True)
            return JsonResponse({"data": serializer.data, "status": status.HTTP_200_OK})
        except:
            return JsonResponse({"data": "Can't retrieve data at this time", "status": status.HTTP_500_INTERNAL_SERVER_ERROR})


@api_view(['POST'])
def vote(request, optionID, pollID, voterMail):

    if request.method == 'POST':
        
        vote_data = {
            'optionID': optionID,
            'pollID': pollID,
            'voterMail': voterMail
        }        
        
        # check if voter has already voted
        check_vote = Votes.objects.filter(optionID = optionID).filter(voterMail = voterMail)
        
        if len(check_vote) > 0:
            return JsonResponse({'data': 'user has already voted', 'status' : status.HTTP_400_BAD_REQUEST})
        elif len(check_vote) < 1:
            try:
                serializer = VotesSerializer(data=vote_data)
                if serializer.is_valid():
                    serializer.save()
                    # return JsonResponse({'data' : serializer.data, 'status' : status.HTTP_200_OK})
                else:
                    return JsonResponse({"data": "Something went wrong", "status": status.HTTP_500_INTERNAL_SERVER_ERROR})
                
                Options.objects.filter(id = optionID).update(votes = F('votes') + 1)
                return JsonResponse({'data' : 'vote added', 'status' : status.HTTP_200_OK})
            except Exception as e:
                return JsonResponse({'data': e, 'status': status.HTTP_500_INTERNAL_SERVER_ERROR})






@api_view(['GET'])
def checkVoteAndReturnResults(request, pollID, linkID, voterMail):
    # check if link exists
    # return options for that poll
    # return users who have voted
    # return if current voter has voted 
    
    if request.method == 'GET':
        
        try:   
            linkExist = None
            
            poll_by_link = Poll.objects.filter(pollLink  = linkID)
            
            if len(poll_by_link) > 0:
                linkExist = True
            else:
                linkExist = False
            
            options = Options.objects.filter(pollID = pollID)
            options_serializer = OptionsSerializer(options, many=True)
            
            voters = Votes.objects.filter(pollID = pollID)
            voters_serializer = VotesSerializer(voters, many = True)
            
            poll = Poll.objects.filter(id = pollID)
            poll_serializer = PollSerializer(poll, many=True)
            
            user_voted = Votes.objects.filter(
                pollID=pollID).filter(voterMail=voterMail)
            
            if len(user_voted) > 0:
                has_user_voted = True
            elif len(user_voted) < 1:
                has_user_voted = False
                
            return JsonResponse({
                'linkExist' : linkExist,
                'options' : options_serializer.data,
                'voters' : voters_serializer.data,
                'has_user_voted' : has_user_voted,
                'status' : status.HTTP_200_OK,
                'poll' : poll_serializer.data
            })
        except Exception as e:
            return JsonResponse({
                'data' : e,
                'status' : status.HTTP_500_INTERNAL_SERVER_ERROR
            })
            
        
    



@api_view(['DELETE'])
def deletePoll(request, pollID):
    # this request will take in the user mail and will be passed in as a filter to the objects
    if request.method == 'DELETE':
        try:
            Poll.objects.filter(id = pollID).delete()
            return JsonResponse({'data': 'Poll deleted!', 'status': status.HTTP_200_OK})

        except Exception as e:
            return JsonResponse({'data' : e, 'status': status.HTTP_500_INTERNAL_SERVER_ERROR})
 

@api_view(['DELETE'])
def deleteAllPolls(request):
    # this request will take in the user mail and will be passed in as a filter to the objects
    if request.method == 'DELETE':
        try:
            Poll.objects.all().delete()
            return JsonResponse({'data': 'All polls deleted!', 'status': status.HTTP_200_OK})

        except Exception as e:
            return JsonResponse({'data': 'Something went wrong', 'status': status.HTTP_500_INTERNAL_SERVER_ERROR})


@api_view(['DELETE'])
def deleteAllVotes(request):
    # this request will take in the user mail and will be passed in as a filter to the objects
    if request.method == 'DELETE':
        try:
            Votes.objects.all().delete()
            return JsonResponse({'data': 'All votes deleted!', 'status': status.HTTP_200_OK})

        except Exception as e:
            return JsonResponse({'data': 'Something went wrong', 'status': status.HTTP_500_INTERNAL_SERVER_ERROR})


 
