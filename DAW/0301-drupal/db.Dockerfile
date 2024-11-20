FROM mariadb:latest
ADD db_data/lorenzo.sql /docker-entrypoint-initdb.d/0000-lorenzo.sql
# RUN sleep 60;mysql -u root -proot < /var/temp/lorenzo.sql
# CMD ["mysqld", " && mysql -u root -proot < /var/temp/lorenzo.sql"]