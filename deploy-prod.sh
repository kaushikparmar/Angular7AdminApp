#!/bin/bash

# This file is created to release the Alghanim CEM Web App to the Azure server

# SET COLOR
R=`tput setaf 1`
G=`tput setaf 2`
Y=`tput setaf 3`
RSET=`tput sgr0`
echo -e "\n"
# Login to server using SSH
# ssh petboox@10.50.250.14 -m deploy-prod.sh
# Change the directory
# cd petboox-admin-build
# Take pull from development
echo "${Y}GIT ${G} - UPDATE STARTED ${RSET}"
echo -e "\n"
git pull origin development
echo -e "\n"
echo "${Y}GIT ${G} - UPDATE ENDED ${RSET}"
echo -e "\n"

# Make A Build
npm run pb-build

# SHOW MSG
# echo -e "${Y}PRODUCTION - ${G} BUILD PROCESS STARTED ${RSET}"
# START BUILD PROCESS
# ng build --configuration=production --base-href https://chevrolet-autoline-prod.alghanim-prod-ase.p.azurewebsites.net
# echo -e "\n"
# SHOW MSG
# echo -e "${Y}PRODUCTION - ${G} BUILD PROCESS ENDED ${RSET}"
# echo -e "\n"
mv ../petboox-admin/public/dist ../petboox-admin/public/dist_bkp_$(date +%d-%m-%Y)
cp -R ./dist  ../petboox-admin/public/dist
# SHOW MSG
# echo -e "${Y}Index.html - ${G} MOVED TO PUBLIC DIRECTORY ${RSET}"

# echo -e "\n"

# releaseOnMaster()
# {
#   cd dist/public
#   # SHOW MSG
#   echo -e "${Y}PRODUCTION - ${G} RELEASE PROCESS STARTED ${RSET}"
#   # git checkout production
#   git config core.autocrlf true
#   git add .
#   git commit -a -m "Released On Production Branch"
#   git push
  # git checkout master
  # SHOW MSG
#   echo -e "${Y}PRODUCTION - ${G} RELEASE PROCESS ENDED ${RSET}"
# }


# Take decision for deploying the app to server

# read -n 1 -p "Press ${Y}  Y ${RSET} to deploy OR Press ${Y}  N ${RSET} to Cancel. (Yes/No) : " userInput

# if [ "$userInput" = "Y" ]; then
#     releaseOnMaster
# elif [ "$userInput" = "N" ]; then
#     echo -e "\n"
# elif [ "$userInput" = "y" ]; then
#     releaseOnMaster
# elif [ "$userInput" = "n" ]; then
#     echo -e "\n"
# else
#     echo -e "\nYou have entered an invallid choice!"
# fi

echo -e "\nPress Enter key OR CTRL+C to exit"
read
