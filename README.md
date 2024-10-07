# Teste técnico Dolado -  API Nest

O projeto foi desenvolvido utilizando NestJS com TypeORM, visando atender ao teste técnico proposto pela Dolado.

## Experiência de Desenvolvimento

De modo geral, a conclusão desse teste foi uma experiência muito positiva. O desafio se revelou intuitivo e estimulante, despertando várias ideias criativas sobre como poderia expandir o projeto. Em termos de desenvolvimento, o processo foi tranquilo, uma vez que utilizei tecnologias e práticas que já aplico no meu dia a dia como programador.

## Principais tomadas de decisões

1. Implementação de validações utilizando **ClassTransformer** e **ClassValidator**, além da criação de **Pipes**, para limitar e evitar erros gerados por parâmetros inválidos em `Params`, `Query` ou `Body` das requisições.
    
2. Utilização da biblioteca `nestjs-typeorm-paginate` para lidar com paginação de maneira simples e dinâmica.
    
3. Padronização das respostas da API, garantindo que toda resposta de sucesso siga o formato `{message: string, data: object}`, sendo `data` um campo opcional para alguns endpoints, como no caso do endpoint de deleção, que retorna apenas uma `message`. Para as respostas de erro, foram implementados diferentes tipos de retorno, de acordo com a origem do erro:
    **Exemplos**:
    
    - Erros causados por DTOs (campos inválidos no body):
      ```json
        {
            "message": [
                "Genre is required",
                "Director is required"
            ],
            "error": "Bad Request",
            "statusCode": 400
        }
      ```
    - Erros causados por parâmetros inválidos na URL (seja em query ou params):
      ```json
        {
            "message": "The value {{id}} is not a number"
        }    
      ```
      Ou quando há valores predefinidos para o campo
      ```json
        {
        "message": "The value {{ss}} is not a valid argument for the {{order}}",
        "data": {
            "validArguments": [
                "ASC",
                "DESC"
            ]
         }
      }
      ```

5. Quando uma tentativa de criar uma review é realizada, mas o título exato não é encontrado, a API OmDb retorna uma lista de títulos semelhantes. Essa lista de filmes relacionados é incluída na resposta da requisição, permitindo que o usuário selecione um título similar caso desejado, assim como ocorre em sites de streaming.
    ```json
        {
        "message": "Movie not found",
        "data": {
            "similarMovies": [
                "Harry Potter and the Deathly Hallows: Part 2",
                "Harry Potter and the Deathly Hallows: Part 1",
                "Harry Potter and the Deathly Hallows: Part II",
                "Harry Potter and the Deathly Hallows: Part I",
                "Harry Potter and the Deathly Hallows Part 1 (2010) and Part 2 (2011) Featuring Brizzy Voices",
                "Harry Potter and the Deathly Hallows Part 1 (2010)"
            ]
           }        
        }
    ```
   
6. Para armazenar a quantidade de visualizações de cada título, as funções `getBy` e `all` dentro do service `GetReviewService` possuem uma chamada assíncrona que não utiliza `await`, permitindo que o incremento das visualizações ocorra em paralelo, sem bloquear o fluxo principal.

## Estrutura
A aplicação foi organizada seguindo o conceito de módulos do NestJS, com uma separação clara das responsabilidades. Além dos módulos principais como `reviews` e `movies`, a estrutura inclui pastas dedicadas para:

- **infra**: onde são armazenadas as migrations e a configuração do TypeORM.
- **config**: responsável por armazenar as configurações do Swagger.
- **utils**: contém implementações e utilitários que são usados de forma global na aplicação.

Além dessa organização, os princípios da Clean Architecture foram aplicados, especialmente a inversão de controle e a injeção de dependência. Essas práticas foram implementadas entre os serviços e repositórios/providers, utilizando chaves de injeção ao invés da implementação concreta, o que reduz o acoplamento e facilita a manutenção do código.

Os serviços foram organizados em arquivos separados conforme suas responsabilidades. Por exemplo, há um serviço dedicado para criar reviews, outro para atualizar, e assim sucessivamente.

Na parte de testes, foi adotada a metodologia AAA (Arrange, Act, Assert), que divide os testes em três fases principais: 

1. **Arrange**: preparação do cenário de teste.
2. **Act**: execução da ação que será testada.
3. **Assert**: verificação dos resultados esperados.

## Instruções de como rodar o projeto.

- **Teste unitários**
```
    npm run test:unit
```

- **Teste integração**
```
    npm run test:integration  
```

- **Todos os testes**
```
    npm run test  
```

- Rodar projeto localmente
  - Necessário ter o Mysql na máquina
  - Criar cópia do .env.example e nomear como .env
  ```
    npm run start:dev
  ``` 

- Rodar projeto docker
    - Necessário ter o docker instalado na máquina
    - Criar cópia do .env.example e nomear como .env
    ```
        docker compose up -d
    ```
- Documentação
    Para acessar a documentação Swagger, acesse: [http://localhost:3000/docs](http://localhost:3000/docs)

**Obs:** o projeto utiliza a imagem mysql:5.7
