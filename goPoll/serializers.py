from lib2to3.pgen2.token import OP
from rest_framework import serializers
from goPoll.models import Poll, Options, Votes

        

class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        # fields = '__all__'
        fields = ['id', 'userMail', 'pollName', 'pollBody',
                  'pollCreatedAt', 'anonymous', 'pollCloseAt', 'pollLink']

class OptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        # fields = '__all__'
        fields = ['id','pollID', 'optionName', 'votes']
        
class VotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Votes
        # fields = '__all__'
        fields = ['id','optionID', 'pollID', 'voterMail']