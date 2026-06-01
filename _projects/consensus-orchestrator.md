---
title: "Consensus Orchestrator"
---

### **Consensus Orchestrator (Ongoing)&nbsp;**
{:style="font-size: 22px"} 

### **Overview**{:.text-highlight}
{:style="font-size: 22px"} 

AI workflow를 설계하는 프로젝트로, 아직 진행 중입니다.\
복수의 AI 코딩 에이전트를 **author와** **critic** 역할로 나누어, 계획-검토-수정 과정을 반복하는 구조를 구현하고 있습니다.\
현재 AI 에이전트를 연결하지 않은 기본 구조를 완성한 상태입니다.

- 개발 기간: 2026. 05 ~ 
- 참여 인원: 1명
- 기술 스택: TypeScript

![GitHub](/assets/icons/github-minimal.svg) [GitHub](https://github.com/JAEHYEON-BAE/consensus-orchestrator)에서 소스코드를 살펴볼 수 있습니다.
{:.text-block}

### **Background**{:.text-highlight}
{:style="font-size: 22px"} 

AI 코딩 에이전트를 개발 과정에 적극적으로 활용하면서, 단순히 빠르게 결과물을 생성하는 것만으로는 충분하지 않다는 문제의식을 갖게 되었습니다. AI가 작성한 계획이나 코드는 빠르게 만들어질 수 있지만, 요구사항 누락, 잘못된 가정, 설계 결함 등이 포함될 수 있습니다. 또한 스스로 생성한 결과를 스스로 지나치게 신뢰하는 *hallucination*을 방지하기 위해서, 비판적인 성향의 새로운 critic 에이전트가 필요합니다.\
\
AI의 출력을 그대로 신뢰하기보다, 생성된 결과를 다른 AI 에이전트가 검토하고 수정하는 흐름을 구조화할 필요가 있다고 판단했습니다.

### **Approach**{:.text-highlight}
{:style="font-size: 22px"} 

본 프로젝트는 복수의 AI 에이전트를 author와 critic 역할로 나누는 구조를 사용합니다. author는 사용자의 요청을 바탕으로 계획을 작성하고, critic은 해당 계획을 비판적으로 검토합니다. \
critic은 검토 결과를 의견과 함께 \[APPROVED] 또는 \[REVISION]으로 출력합니다. \[APPROVED]를 받으면 그대로 구현을 진행하고, \[REVISION]을 받으면 author가 다시 계획을 보완하여 \[APPROVED]를 받을 때까지 반복합니다. 너무 과한 토큰 소모를 방지하기 위해, 최대 반복 횟수를 제한할 수 있습니다.\
\
전체 흐름은 AI가 임의로 제어하지 못하도록 설계하고 있습니다. 상태 전이, 반복 횟수 제한, 승인 여부 판단은 유한 상태 기계와 같은 전통적인 알고리즘 구조로 관리합니다. AI는 계획 작성과 검토처럼 판단이 필요한 부분을 맡고, 시스템의 진행 흐름은 결정론적인 코드가 제어하도록 하는 것이 핵심입니다.