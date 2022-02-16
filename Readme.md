Como consumir a API:

- Para obter os produtos, utilize
  curl --request GET \
   --url http://localhost:8000/produtos/
  OU
  curl --request GET \
   --url http://localhost:8000/produtos/:id

Substitua o :id pelo id do produto

Para obter os pedidos, utilize:
curl --request GET \
 --url http://localhost:8000/pedidos/:id/:status
Status pode ser 1 -> Finalizado ou 0 -> Não finalizado

Substitua o :id pelo id do usuário

Para obter os produtos ligados aos pedidos, utilize:
curl --request GET \
 --url http://localhost:8000/pedidos/produtos/:id \
 --header 'Content-Type: application/json' \
 --data '{
"finished": "0"
}'

Substitua o :id pelo id do usuário

curl --request POST \
 --url http://localhost:8000/pedidos \
 --header 'Content-Type: application/json' \
 --data '{
"cliente_id": "1",
"produto_id": "1",
"quantidade": "1"
}'

Substitua os dados pelos ID's dos produtos e cliente.

Na pasta /seeds estão armazenados os dados para popular a tabela de usuários e produtos
