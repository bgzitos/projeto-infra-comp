# Documentação da Pipeline CI/CD configurada para o Desafio de Infraestrutura da Comp Júnior, utilizando Github Actions, SonarCloud, Docker e Render.

Este repositório é a solução para um desafio de infraestrutura focado na criação de uma pipeline de CI/CD completa, desde o teste até o deploy automatizado usando Docker e Render.

## Status do Projeto

![Status da Pipeline (Github Actions)](https://github.com/bgzitos/projeto-infra-comp/actions/workflows/node.js.yml/badge.svg)
![SonarCloud Teste de Qualidade](https://sonarcloud.io/api/project_badges/measure?project=bgzitos_projeto-infra-comp&metric=alert_status)
![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=bgzitos_projeto-infra-comp&metric=coverage)

---

## Tecnologias utilizadas

* **Aplicação:** Node.js, Express
* **Testes:** Jest
* **CI/CD:** Github Actions
* **Qualidade de Código:** SonarCloud
* **Containerização:** Docker
* **Deploy:** Render

---

## O Pipeline de CI/CD

A principal função do projeto é a pipeline de automação configurada em `.github/workflows/node.js.yml`. Ela é dividida em duas tarefas (jobs) principais que rodam em sequência:

### 1. Job: `build_test_and_analyze` (Testar e analisar)

Esta tarefa funciona como o portão de qualidade (Quality Gate), garantindo que nenhuma alteração responsável por quebrar o projeto ou reduzir a qualidade seja aceita.

### Seus passos são, respectivamente: 

1.  **Checkout do código:** Baixa o código-fonte do repositório.
2.  **Configurar Node.js:** Prepara o ambiente de execução (`Node.js 20.x`).
3.  **Instalar dependências:** Roda `npm ci` para instalar as dependências de forma otimizada.
4.  **Rodar testes com análise:**
    * Executa `npm run test:coverage` para rodar os testes unitários com Jest.
    * Ao mesmo tempo, gera um relatório de cobertura de testes.
5.  **Scan do SonarCloud:**
    * Envia o relatório de cobertura e o código-fonte para o SonarCloud.
    * O Sonar analisa o código em busca de bugs e/ou vulnerabilidades.
    * O "Quality Gate" é verificado (ex: se a cobertura de testes é maior que 80%).
    * **Se o Quality Gate falhar, a pipeline para aqui e o deploy é bloqueado.**
  
### 2. Job: `build_push_and_deploy` (Construir e realizar deploy)

Esta tarefa só é executada se o job anterior (`build_test_and_analyze`) for concluído com sucesso e se a mudança for um `push` na branch `main`.

### Seus passos são, respectivamente:

1.  **Checkout do código:** Mais uma vez baixa o código-fonte
2.  **Login no github container registry:** Autentica no registro de pacotes do GitHub para permitir o envio da imagem Docker.
3.  **Construir e enviar Docker:**
    * Lê o `Dockerfile` na raiz do projeto.
    * Constrói uma imagem Docker leve (`node:20-alpine`) contendo a aplicação Node.js.
    * Envia (`push`) a imagem final para o container registry, com as tags `:latest` e o hash do commit.
4.  **Deploy no Render:**
    * Executa um comando `curl` que chama um "Deploy Hook" secreto do Render.
    * O Render automaticamente baixa a nova imagem do container registry e atualiza a aplicação no ar.
  
---
