from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    # path('createPoll/<userMail>/<pollName>/<pollBody>/<pollOptions>/<pollCloseAt>/<anonymous>/', views.createPoll),
    path('createPoll/', views.createPoll),
    path('viewPolls/<userMail>/', views.viewPolls),
    path('vote/<optionID>/<pollID>/<voterMail>/', views.vote),
    path('checkVote/<pollID>/<linkID>/<voterMail>/', views.checkVoteAndReturnResults),
    path('deletePoll/<pollID>/', views.deletePoll),
    path('deleteAllPolls/', views.deleteAllPolls),
    path('viewAllPolls/', views.viewAllPolls),
    path('viewAllOptions/', views.viewAllOptions),
    path('viewAllVotes/', views.viewAllVotes),
    path('deleteAllVotes/', views.deleteAllVotes)
]


