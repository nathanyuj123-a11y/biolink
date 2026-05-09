# Biolink S.A Franchising — Documentação

## O que é

Página de link tree para a bio do Instagram de cada unidade da rede. Cada loja tem seu próprio arquivo HTML, com:

- **WhatsApp** — link direto para contato
- **Localização** — Google Maps da unidade
- **S.A Casa do Sushi** — link do site da marca
- **S.A Casa do Poke** — link do site da marca
- **S.A Casa do Yakisoba** — link do site da marca

---

## Arquivos

| Arquivo | Descrição |
|---|---|
| `biolink_TEMPLATE.html` | Template base com logos já embutidas. Editar para cada nova loja. |
| `biolink_florianopolis.html` | Exemplo de loja pronto (Florianópolis · SC) |

---

## Como criar a página de uma nova loja

Abra o `biolink_TEMPLATE.html` em qualquer editor de texto e substitua os 7 marcadores:

```
LOGO_LOJA_SRC   → base64 da logo da marca (sushi, poke ou yakisoba)
NOME_LOJA       → ex: Casa do Sushi
CIDADE_LOJA     → ex: Curitiba
UF_LOJA         → ex: PR
LINK_WHATS      → https://wa.me/55XXXXXXXXXXX
LINK_MAPS       → link do Google Maps da unidade
LINK_SUSHI      → URL do site S.A Casa do Sushi
LINK_POKE       → URL do site S.A Casa do Poke
LINK_YAKI       → URL do site S.A Casa do Yakisoba
```

Salve como `biolink_NOMEDACIDADE.html`.

---

## Logos disponíveis

As logos das 3 marcas já estão embutidas em base64 dentro do `biolink_TEMPLATE.html` — não é necessário nenhum arquivo externo.

Para o **cabeçalho** (círculo no topo), usar o símbolo redondo da marca.
Para os **cards "Conheça também"**, as logos completas horizontais já estão no template.

| Marca | Símbolo no header | Logo nos cards |
|---|---|---|
| Casa do Sushi | Símbolo DO vermelho | Logo horizontal preta |
| Casa do Poke | — | Logo horizontal preta |
| Casa do Yakisoba | — | Logo horizontal preta |

---

## Hospedagem

O arquivo HTML é **100% autossuficiente** — todas as logos estão embutidas em base64, sem dependências externas além das fontes Google Fonts (Bebas Neue + DM Sans).

Opções de hospedagem gratuita para usar na bio do Instagram:

- **GitHub Pages** — subir o arquivo num repositório e ativar Pages
- **Netlify Drop** — arrastar o arquivo em [netlify.com/drop](https://netlify.com/drop)
- **Tiiny.host** — upload direto, link imediato

URL sugerida por loja: `seudominio.com/florianopolis` ou `casadosushi-floripa.netlify.app`

---

## Geração em lote (múltiplas lojas)

Para gerar todos os arquivos de uma vez, fornecer ao Claude uma lista no formato:

```
Loja: Casa do Sushi Florianópolis
Marca: sushi
WhatsApp: 48 99999-9999
Maps: https://maps.google.com/...
```

O Claude pode processar a lista completa e gerar um arquivo `.html` por unidade automaticamente, com todas as logos já embutidas.

---

## Identidade visual

- Fundo: `#0d0d0d`
- Vermelho da rede: `#C8102E`
- Tipografia: Bebas Neue (títulos) + DM Sans (corpo)
- Layout: mobile-first, max-width 480px, otimizado para celular
