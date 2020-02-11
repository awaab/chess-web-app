#!/bin/python3

import math
import os
import random
import re
import sys



#
# Complete the 'maxEvents' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER_ARRAY arrival
#  2. INTEGER_ARRAY duration
#
from collections import defaultdict 

class Edge:
    def __init__(self,u,v,d):
        self.u=u
        self.v=v
        self.d=d
    def __str__(self):
        return str(self.u)+','+str(self.v)+', '+str(self.d)
edges = []
graph = defaultdict(list)

def addEdge(graph,u,v,d): 
    graph[u].append(Edge(u,v,d))
    edges.append(Edge(u,v,d))

def fillGraph(arrival, duration):
    global graph
    global edges
    endings = []
    
    for i in range(0,len(arrival)):
        ar =  arrival[i]
        dur = duration[i]
        ending = ar+dur
        endings.append(ending)
        #Add edges for events with dist = 1
        addEdge(graph,ar,ending,1)
        #edges.append(Edge(ar,ending,1))
        #Add edge from begin to event arival with dist = 0
        addEdge(graph,0,ar,0)
        #Add edge from end of event to end of day with dist = 0
        addEdge(graph,ending,100000,0)
    #Add edge from ending of ending of event to next event with dist = 0
    for ending in endings:
        for ar in arrival:
            if ending <= ar:
                addEdge(graph,ending,ar,0)
    #After graph is ready find longest path between 0 and 100000 ie. with most events
    dijkstra()
def dijkstra():
    global edges
    q=[]
    dist={}
    q.append(Edge(0,0,-2))
    dist[0]=-2
    while(len(q)>0):
        cur = q.pop(0).v
        for next_edge in graph[cur]:
            if next_edge.v not in dist or next_edge.d + dist[cur] < dist[next_edge.v]:
                q.append(next_edge)
                dist[next_edge.v] = dist[cur] + next_edge.d
                #print('cue',cur,q)
                print(dist)
    print(edges)
    print(dist)





def maxEvents(arrival, duration):
    fillGraph(arrival, duration)
    global edges
    for edge in (edges):
        print(str(edge.u)+','+str(edge.v)+','+str(edge.d))

if __name__ == '__main__':#!/bin/python3

import math
import os
import random
import re
import sys




if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    arrival_count = int(input().strip())

    arrival = []

    for _ in range(arrival_count):
        arrival_item = int(input().strip())
        arrival.append(arrival_item)

    duration_count = int(input().strip())

    duration = []

    for _ in range(duration_count):
        duration_item = int(input().strip())
        duration.append(duration_item)

    result = maxEvents(arrival, duration)

    fptr.write(str(result) + '\n')

    fptr.close()
