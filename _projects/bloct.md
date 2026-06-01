---
title: "Bloct: Markdown Editor for macOS"
---

### **Bloct: Markdown Editor for macOS&nbsp;**
{:style="font-size: 22px"} 

![Bloct_1](/assets/images/Bloct_1.png)

### **Overview**{:.text-highlight}
{:style="font-size: 22px"} 

Swift를 기반으로 제작한 macOS 전용 markdown 에디터 프로그램입니다.\
문서를 마크다운 **블록 단위**로 나누어서 편집할 수 있고, *LaTeX* 수식, 코드 블록, 이미지, 하이퍼링크 등 다양한 요소를 삽입할 수 있습니다.\
GitHub Actions와 Homebrew를 이용하여 배포했습니다.

- 개발 기간: 2026. 02 ~ 2026. 04
- 참여 인원: 1명
- 기술 스택: Swift

![GitHub](/assets/icons/github-minimal.svg) [GitHub](https://github.com/JAEHYEON-BAE/bloct)에서 소스코드를 보거나 [설치](https://github.com/JAEHYEON-BAE/bloct/releases)할 수 있습니다.
{:.text-block}

다음 명령어로 더 쉽게 설치할 수 있습니다.
```
brew tap JAEHYEON-BAE/tap
brew install --cask bloct
xattr -cr /Applications/Bloct.app
```

<br>

### **Situation & Task**{:.text-highlight}
{:style="font-size: 22px"} 

AI 에이전트를 자주 활용하면서, 작업 과정에서 markdown 형식의 문서를 다루는 일이 많아졌습니다. markdown은 PDF나 docx보다 가벼우면서, 일반 텍스트 파일보다는 구조화되어 있기 때문에 기획 문서나 결과 정리 문서를 작성하기에 적합했습니다.\
하지만 macOS 기본 환경에서는 markdown 파일을 확인하고 수정하기가 불편했습니다. 일반 텍스트 편집기로는 문서 구조를 파악하기 어려웠고, VS Code 등의 코드 편집기를 사용하기에는 너무 무거웠습니다.\
\
따라서 불필요한 기능 없이 가벼우면서도 markdown의 구조와 기능을 전부 활용할 수 있는 **markdown 전용 편집기**를 제작하는 것을 목표로 잡았습니다.

<br>

### **Action**{:.text-highlight}
{:style="font-size: 22px"} 

처음에는 최대한 간단하고 가벼운 viewer를 제작하였습니다. [marked.js](https://github.com/markedjs/marked)를 이용하여 markdown 문서를 html 형태로 파싱한 뒤, 이를 Swift 앱에서 보여주는 형태입니다.\
이후 실제로 사용해보며, 단순한 텍스트로는 불충분하다는 점을 확인했습니다. 문서 내에 *LaTeX* 수식이 포함되어야 하는 경우가 많았기 때문에, 이를 표현할 수 있도록 [KaTeX](https://katex.org) 오픈소스 라이브러리를 이용하여 `$...$`, `$$...$$` 형태의 수식 렌더링 기능을 추가했습니다.\
\
수식 렌더링 기능이 추가되면서, 수식과 코드 블록, `*...*`, `**...**` 등의 markdown 기능이 서로 엉키며 의도대로 렌더링되지 않는 문제가 발생했습니다. 따라서 서로 보호되어야 하는 영역을 먼저 처리할 수 있도록 파싱 우선순위를 다음과 같이 지정했습니다.

이미지 → 코드 블록 → 인라인 코드 → 수식 블록 → 인라인 수식 → 헤더 → 그 외 텍스트
{:.text-block}
\
viewer 개발 과정에서 가장 고민했던 부분은, markdown 파일의 파싱 방식이 서비스(GitHub, VS Code)마다 조금씩 다르다는 점이었습니다. 같은 문서라도 도구에 따라 다르게 표현될 수 있었기 때문에 **사용자가 익숙하게 느끼는 기준**이 필요했습니다. 따라서 전체적인 사용감과 디자인은 [Notion](https://www.notion.com)을 참고하였고, 수식이나 이미지를 처리하는 로직은 VS Code와 [pandoc](https://pandoc.org)의 동작 방식을 참고했습니다.\
\
위와 같이 간단한 viewer를 구현한 뒤, 편집 기능을 구현하였습니다. 초기 기획 방향은 raw 텍스트와 렌더링 후 텍스트를 동시에 보여주면서 raw 텍스트를 편집할 수 있도록 하는 방향이었습니다. 구현 과정은 비교적 간단했지만, 실제 구현해보니 다음과 같은 문제가 발생했습니다.
- 두 영역을 동시에 표시하면서 화면 공간이 비효율적으로 사용됨
- raw 영역과 렌더링 영역의 스크롤 위치를 자연스럽게 맞추기 어려움

위 문제를 해결하기 위해서 Notion의 기능을 참고해 완전한 WYSIWYG 에디터를 구현하는 방안도 검토했지만, 이는 구현의 복잡성이 너무 높다고 판단했습니다.\
\
따라서 두 형태를 절충할 수 있는 **블록** 아이디어를 떠올렸습니다. \
\
View 모드와 Edit 모드를 분리하여, Edit 모드에서 문서의 특정 영역을 클릭하면 해당 "블록"의 raw 텍스트를 편집할 수 있도록 했습니다. 수정 후 다시 view 모드로 돌아오면 변경된 markdown이 즉시 렌더링되어 결과를 확인할 수 있습니다. 이를 통해 구현의 복잡성은 줄이면서도 사용자가 필요한 부분만 명확하게 수정할 수 있도록 구현했습니다.

<br>

### **Result**{:.text-highlight}
{:style="font-size: 22px"} 

Bloct를 통해 macOS 환경에서 markdown 문서를 렌더링된 형태로 확인하고, 필요한 부분만 block 단위로 수정할 수 있게 되었습니다. raw 텍스트 편집기와 별도 미리보기 도구를 오갈 필요 없이, 하나의 앱 안에서 문서 확인과 수정 결과 확인을 이어갈 수 있도록 구성했습니다.\
\
LaTeX 수식, 이미지, 코드 블록이 포함된 문서도 처리할 수 있도록 확장하면서, AI 코딩 에이전트와 함께 작업하며 자주 사용하는 markdown 문서의 활용성을 높였습니다. 또한 GitHub Actions와 Homebrew를 이용해 빌드와 배포 과정을 구성하여, 다른 macOS 사용자도 쉽게 설치해 사용할 수 있는 형태로 공개했습니다.\
\
이 프로젝트를 통해 실제 사용 흐름을 관찰하며 기능성과 구현 복잡성 사이의 적절한 균형을 선택하는 경험을 쌓았습니다. 또한 사용자가 익숙하게 느끼는 기준을 정하고 일관된 경험을 제공하는 것이 중요하다는 점을 배웠습니다.