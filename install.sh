rm -rf /usr/bin/desmos

# Beware: do not have an executable called `calc`
rm -f /usr/bin/calc

mkdir /usr/bin/desmos

cp -r ./release-builds/desmos-offline-mode-linux-x64/* /usr/bin/desmos

touch /usr/bin/calc
echo "!#/bin/bash" >> /usr/bin/calc
echo "/usr/bin/desmos/desmos-offline-mode &" >> /usr/bin/calc

chmod a+x /usr/bin/calc
