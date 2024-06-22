psql -U postgres -d frupay_order_integration_db -c \
"create extension if not exists \"uuid-ossp\"";
