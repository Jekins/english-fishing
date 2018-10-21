#!/bin/bash

mkdir src/blocks/$1;

for i in ${@:2}
do
    if [ $i == "js" ] || [ $i == "scss" ];then
        touch src/blocks/$1/$1.$i

	if [ $i == "scss" ];then
            #scss
            echo '/* '$1' ***********************/' >> src/blocks/$1/$1.scss
            echo '.'$1' {}' >> src/blocks/$1/$1.scss
            printf '\n@import "../blocks/'$1'/'$1'";' >> src/scss/common.scss
            echo $1'.scss created';
	fi
	if [ $i == "js" ];then
            #JS
            varName=$1
            original_string=$varName
            replace_string=''
            result_string=$original_string

            echo '/* '$1' ***********************/' >> src/blocks/$1/$1.js
            printf "$.fn.$result_string = function () {
            };" >> src/blocks/$1/$1.js

            echo $1'.js created';
	fi
    fi
done