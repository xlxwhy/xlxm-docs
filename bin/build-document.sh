#!/bin/bash
# for github workflow

BASEDIR=$(cd "$(dirname "$0")";pwd) ;

## function
 

 
## script

cd  $BASEDIR/../document/$1
npm run build

TARGET="$BASEDIR/../docs/.vitepress/dist/document/$1"
SOURCE="$BASEDIR/../document/$1/.vitepress/dist"

 
if [ -d $TARGET ] ;   then   rm -rf $TARGET;   fi


mkdir -p $TARGET
cp -rf $SOURCE/*  $TARGET/

