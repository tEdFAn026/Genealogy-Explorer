# Introduction About Genealogy Explorer!

### University of Leicester - CO7098 : Web Technology - Autumn 2018 - Assignment 3

I will set this repository as public after assignment deadline.

## Environment

eclipse spring and maven **(with out sts, run in tomcat)**.

## Config

Database config is in "src/main/resource/persistence.xml", other in "springContext.xml".

## Part 1: RESTful Web Service

All your required Web Service methods have been implemented in "CO7098.CW3.zf41.controller.PersonOperation". As required for example, when you want to ad a person, you should set a Get request to /GE/person/add?(params), you may set this request to this Url: hostName:port/projectName/GE/person/add?(params), this will not work. In case the **project name is already called "GE"**, so there is no project name in Url,
you should send your request directly to **hostName:port/GE/person/add?(params)**. All other requests are same.

## Part 2: Web Interface

You can the search function in all pages in the search input content in nav bar.
#### Index Page
 Url  :  hostName:port/GE/
 Draw the GE tree, and show selected person info, and edit and delete the selected person.
#### List Page
 Url  :  hostName:port/GE/person/All
 List all the person in the page, you can add, edit and delete a person in the page.
#### Person Detail Page
 Url  :  hostName:port/GE/person/detail/{key}
 Show person detail, you can go the mother or father by link if this person has mother or father.
 And draw the  descendants and ancestors tree in this page. You can show hide the branches of a tree.
