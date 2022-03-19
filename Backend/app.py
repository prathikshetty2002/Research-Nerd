import json
from urllib import request
import csv
import json
from flask import Flask, request
from flask_cors import cross_origin
app = Flask(__name__) 
cross_origin(app)
import pandas as pd
import pickle

temp_df = pd.read_pickle('temp_df.pkl')
pred_df = pd.read_pickle('pred_df.pkl')
similarity = pickle.load(open('similarity1.pkl','rb'))


import string
def helper(x):
    temp = str.maketrans('','',string.punctuation)
    return x.translate(temp)

temp_df['abstract'] = temp_df['abstract'].apply(helper)
temp_df['title'] = temp_df['title'].apply(helper)

def recommend(paper):
    lis = []
    paper_idx = pred_df[pred_df['title'] == paper].index[0]
    distance = similarity[paper_idx]
    paper_list = sorted(list(enumerate(distance)),reverse=True,key=lambda x:x[1])[1:10]
    for i in paper_list:
        id = pred_df.iloc[i[0]].id
        lis.append(id)
    return lis



@app.route('/search', methods=['GET'])  
@cross_origin()
def message():  
    args = request.args
    print(args['q'])
    lis = recommend(args['q'])
    obj = []
    for i in range(len(lis)):
        dict = {}
        id = lis[i]
        dict["id"] = id
        dict["title"] = temp_df[temp_df['id'] == id].title.values[0]
        dict["author"] = temp_df[temp_df['id'] == id].authors.values[0]
        dict["categories"] = temp_df[temp_df['id'] == id].categories.values[0]
        dict["abstract"] = temp_df[temp_df['id'] == id].abstract.values[0]
        dict["update_date"] = temp_df[temp_df['id'] == id].update_date.values[0]
        obj.append(dict)

    print("\n\n\n\n\n")
    print(json.dumps(obj))
    return json.dumps(obj)

import math
def category_recommend(lis):
    cat_list = []
    n = 10/len(lis)
    for category in lis:
        for i in range(math.ceil(n)):
            dic = {}
            dic['id'] = temp_df.loc[temp_df['categories'].str.contains(category, case=False)].iloc[i].id
            dic['author'] = temp_df.loc[temp_df['categories'].str.contains(category, case=False)].iloc[i].authors
            dic['categories'] = temp_df.loc[temp_df['categories'].str.contains(category, case=False)].iloc[i].categories
            dic['abstract'] = temp_df.loc[temp_df['categories'].str.contains(category, case=False)].iloc[i].abstract
            dic['update_date'] = temp_df.loc[temp_df['categories'].str.contains(category, case=False)].iloc[i].update_date
            cat_list.append(dic)
    return cat_list



import random
@app.route('/random', methods=['GET'])  
@cross_origin()
def rand():
    h_df = temp_df.iloc[1:11]
    lis = []
    for idx,row in h_df.iterrows():
        dict = {}
        dict["id"] = row["id"]
        dict["authors"] = row["authors"]
        dict["title"] = row["title"]
        dict["categories"] = row["categories"]
        dict["abstract"] = row["abstract"]
        dict["date"] = row["update_date"]
        lis.append(dict)
    
    print("\n\n\n\n\n")
    print(json.dumps(lis))
    return json.dumps(lis)



# @app.route('/category')
# def category():
#     cat_lis = category_recommend(['astro-ph', 'hep-ph'])
#     print(cat_lis)
#     return '<h1>Categories</h1>'

if __name__ == '__main__':  
   app.run(debug = True)


  

'''
    [
        {
            status: 200,
            result: {
                    id: 1,
                    title: fafe,
                    author: rfwqaf,
                    category: afeaf,
                    date: 242/24/24,
                    comment: esagwag,
                    abstract: arfafa
                },
                recommende: []
        },
        
    ]
'''