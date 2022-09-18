<h1 align="center">
    <img alt="Widget" src=".github/logo.svg" width="200px" />
</h1>

<h4 align="center">
  🚀 Next Level Week - eSports
</h4>


<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#telas">Telas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#exemplo">Exemplo</a>
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Django](https://www.djangoproject.com/)
- [Django-Rest-Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)

## 💻 Projeto
**A melhor edição da NLW. Aplicação para encontrar parceiros para jogar seu jogo favorito.**

## Instalação
### Pré requisitos
Ter instalado:
- [Python](https://www.python.org/downloads/)
- [Node](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Expo](https://docs.expo.dev/get-started/installation/)

### Clonar projeto
#### No terminal, rodar
```sh
git clone https://github.com/andre23arruda/nlw-esports
```

### Backend
#### No terminal, rodar:
```sh
# Entrar na pasta dos arquivos do backend
cd backend

# Renomear env_example.py para env.py
cp setup/env_example.py setup/env.py
# ADICIONE OS VALORES CORRETOS

# Criar um ambiente virtual
python -m venv venv

# Ativar o ambiente virtual
. activate.sh
# ou
. venv/Scripts/activate # windows
. venv/bin/activate # linux

# Instalar os pacotes necessários
pip install -r requirements.txt

# Executar as migrações
python manage.py migrate

# Carregar jogos
python manage.py loaddata games

# Rodar backend
python runserver.py
```

### Web
#### No terminal, rodar
```sh
# Entrar na pasta dos arquivos
cd web

# Instalar os pacotes necessários
yarn install

# Renomear .env_example.local para .env.local
cp .env_example.local .env.local
# ADICIONE OS VALORES CORRETOS

# Rodar
yarn dev
```

<div align="center">
    <img alt="Screen 1" title="Screen 1" src=".github/web_1.jpeg?raw=true" width="400px" />
</div>
<p align="center">Screen 1</p>
<hr>

<div align="center">
    <img alt="Screen 2" title="Screen 2" src=".github//web_2.jpeg?raw=true" width="400px" />
</div>
<p align="center">Screen 2</p>
<hr>


## Exemplo
<a href="https://andrearruda-esports.vercel.app/" target="_blank">Visitar</a>