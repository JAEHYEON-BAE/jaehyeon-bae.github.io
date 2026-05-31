---
title: "Lights: DMX Lighting Controller"
---

### **Lights: DMX Lighting Controller&nbsp;**
{:style="font-size: 22px"} 


![Lights_1](/assets/images/Lights_1.png)

### **Overview**{:.text-highlight}
{:style="font-size: 22px"} 

JavaScript와 Electron을 기반으로 제작한 무대 조명 컨트롤러입니다. 최대 32개의 조명을 제어할 수 있으며, 각 조명의 색상, 밝기, 패턴 등을 자유롭게 구성하는 방식으로 무대 조명을 연출할 수 있습니다.

- 개발 기간: 2026. 03 ~ 2026. 05
- 참여 인원: 2명
- 기술 스택: JavaScript, Electron, Arduino

![GitHub](/assets/icons/github-minimal.svg) [GitHub](https://github.com/JAEHYEON-BAE/Lights)에서 소스코드를 보거나 [설치](https://github.com/JAEHYEON-BAE/Lights/releases)할 수 있습니다.
{:.text-block}

### **Situation & Task**{:.text-highlight}
{:style="font-size: 22px"} 

이 프로젝트는 동아리 공연 과정에서 사용할 조명을 직접 제어하기 위해서 시작되었습니다. 따라서 복잡한 DMX 조명 제어 과정을 비전문가인 부원들이 직관적으로 제어할 수 있도록 데스크톱 프로그램을 만드는 것을 목표로 설정했습니다.\
사용자는 조명 장비의 작동방식이나 DMX 통신 구조를 이해하지 않고도 색상과 밝기, 패턴 등을 조정하고 무대를 연출할 수 있어야 했습니다. 자유롭게 조명을 구성하면서도 각 장면이 재사용 가능해야 했고, 음악의 BPM에 맞춰서 자동으로 변환되는 기능도 필요했습니다. 비전문가를 대상으로 하기 때문에 DAW 프로그램이나 MIDI 등은 가급적 사용하지 않도록 했습니다.\
\
무대에 사용하는 조명 장치는 7-channel RGB 타입이며, 하드웨어로는 Arduino와 DMX Shield를 사용하였습니다.

### **Action**{:.text-highlight}
{:style="font-size: 22px"} 


macOS 사용자와 Windows 사용자 모두가 손쉽게 사용하기 위해서, 특정 운영체제에 종속되지 않는 데스크톱 프로그램이 필요했습니다. 따라서 JavsScript와 Electron을 선택하였고, 두 운영체제에 맞춰서 따로 개발할 필요 없이 하나의 코드로 양쪽에서 모두 실행 가능한 프로그램을 만들었습니다. 빌드 및 배포 과정은 GitHub Actions를 이용해 관리했습니다.\
\
다른 팀원이 Arduino와 DMX Shield 기반의 하드웨어를 제작하였고, 저는 Arduino에 이식할 코드와 데스크톱 프로그램 전반을 개발하였습니다.\
\
여러 하드웨어와 함께 동작하는 프로그램이었기 때문에, 개발 환경에서 드러나지 않던 문제들이 실제 환경에서 발생되었습니다. 대표적으로 다음과 같습니다.
- 조명 제어 실패 시, 원인이 발생하는 단계를 찾기 어려움
- 앱 내부에서 Visualize 되는 상태와 실제 하드웨어로 전송되는 값이 어긋남
- USB Serial 통신 중 패킷이 손상되거나 신호가 유실됨

이 과정에서 검증 가능한 구조와 계층별 분리, 예외사항 처리의 중요성을 체득했습니다.\
\
위 문제는 다음과 같이 해결하였습니다.
- Arduino에 heartbeat watcher를 추가해 연결 상태를 모니터링하고, simulate mode를 구현하여 하드웨어가 없는 환경에서 재현
- 실제 하드웨어로 전송되기 직전의 신호를 가로채는 `outputState`를 기준으로 Visualize 하도록 수정
- Start Byte `0xFF`를 기준으로 Arduino parser가 재동기화되도록 설계


### **Result**{:.text-highlight}
{:style="font-size: 22px"} 

![Lights_3](/assets/images/Lights_3.png)

실제 동아리 공연 현장에서 오류 발생 없이 운용되었습니다. 비전문가인 부원들이 직관적으로 조명을 제어할 수 있었고, 긍정적인 피드백을 받았습니다.\
처음으로 하드웨어와 함께 진행한 프로젝트였는데, 개발 환경과 실제 하드웨어 환경 사이의 간극을 체감하면서도 실제 상황을 고려하는 개발 습관의 중요성을 배울 수 있었습니다.