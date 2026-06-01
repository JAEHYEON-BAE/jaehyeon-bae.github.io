---
title: "Lights: DMX Lighting Controller"
---

### **Lights: DMX Lighting Controller&nbsp;**
{:style="font-size: 22px"} 


![Lights_1](/assets/images/Lights_1.png)

### **Overview**{:.text-highlight}
{:style="font-size: 22px"} 

JavaScript와 Electron을 기반으로 제작한 무대 조명 컨트롤러입니다. 최대 32개의 조명을 제어할 수 있으며, 각 조명의 색상, 밝기, 패턴 등을 자유롭게 구성해 무대 조명을 연출할 수 있습니다.

- 개발 기간: 2026. 03 ~ 2026. 05
- 참여 인원: 2명
- 기술 스택: JavaScript, Electron, Arduino

![GitHub](/assets/icons/github-minimal.svg) [GitHub](https://github.com/JAEHYEON-BAE/Lights)에서 소스코드를 보거나 [설치](https://github.com/JAEHYEON-BAE/Lights/releases)할 수 있습니다.
{:.text-block}

<br>

### **Situation & Task**{:.text-highlight}
{:style="font-size: 22px"} 

이 프로젝트는 동아리 공연 과정에서 사용할 조명을 직접 제어하기 위해서 시작되었습니다. 따라서 복잡한 DMX 조명 제어 과정을 비전문가인 부원들이 직관적으로 제어할 수 있도록 데스크톱 프로그램을 만드는 것을 목표로 설정했습니다.\
사용자는 조명 장비의 작동방식이나 DMX 통신 구조를 이해하지 않고도 색상과 밝기, 패턴 등을 조정하고 무대를 연출할 수 있어야 했습니다. 자유롭게 조명을 구성하면서도 각 장면이 재사용 가능해야 했고, 음악의 BPM에 맞춰서 자동으로 변환되는 기능도 필요했습니다. 비전문가를 대상으로 하기 때문에 DAW 프로그램이나 MIDI 등에 의존하지 않도록 했습니다.\
\
무대에 사용하는 조명 장치는 7-channel RGB 타입이며, 하드웨어로는 Arduino와 DMX Shield를 사용하였습니다.

<br>

### **Action**{:.text-highlight}
{:style="font-size: 22px"} 

다른 팀원이 Arduino와 DMX Shield 기반의 하드웨어를 제작하였고, 저는 Arduino에 이식할 코드와 데스크톱 프로그램 전반을 개발하였습니다.\
\
macOS 사용자와 Windows 사용자 모두가 손쉽게 사용하기 위해서, 특정 운영체제에 종속되지 않는 데스크톱 프로그램이 필요했습니다. 따라서 JavaScript와 Electron을 선택하였고, 두 운영체제에 맞춰서 따로 개발할 필요 없이 하나의 코드로 양쪽에서 모두 실행 가능한 프로그램을 만들었습니다. 빌드 및 배포 과정은 GitHub Actions를 이용해 관리했습니다.\
\
여러 하드웨어와 함께 동작하는 프로그램이었기 때문에, 개발 환경에서 드러나지 않던 문제들이 실제 환경에서 발생했습니다. 대표적으로 다음과 같습니다.
- **문제: 조명 제어 실패 시, 원인이 발생하는 단계를 찾기 어려움**\
    → Arduino에 heartbeat watcher를 추가해 연결 상태를 모니터링하고,\
    simulate mode로 하드웨어 없이 문제 상황 재현\
    
- **문제: 앱 시각화 상태와 실제 전송값의 불일치**\
    → 전송 직전에 신호를 가로채는 `outputState`를 기준으로 시각화\

- **문제: USB Serial 패킷 손상 · 유실**\
    → Start Byte `0xFF` 기준으로 parser가 재동기화되도록 설계

세 문제 모두 "어디서 잘못됐는지 보이지 않는다"는 공통점이 있었습니다. 따라서 오류 상황을 더 정확하게 분석하기 위해서 신호가 흐르는 각 단계를 관찰·검증할 수 있도록 계층을 분리하는 방향으로 접근했습니다. 특히 simulate mode 덕분에 하드웨어가 없는 개발 환경에서도 프로그램을 반복 검증하며, 실제 환경에서 소프트웨어의 문제를 배제하고 분석할 수 있었습니다. 이는 문제 상황에서 원인 발견에 큰 도움이 되었습니다.

<br>

### **Result**{:.text-highlight}
{:style="font-size: 22px"} 

![Lights_3](/assets/images/Lights_3.png)

실제 동아리 공연 현장에서 약 2시간 동안 7개의 조명을 동시에 제어하며 오류 발생 없이 운용되었습니다. 비전문가인 부원들이 직관적으로 조명을 제어할 수 있었고, 긍정적인 피드백을 받았습니다. 받은 피드백을 바탕으로 UI 개선과 기능 추가를 이어갈 계획입니다.\
\
처음으로 하드웨어와 함께 진행한 프로젝트였습니다. 개발 환경에서 완벽히 동작하던 코드가 실제 무대에서는 패킷 유실이나 상태 불일치로 어긋나는 것을 직접 겪으며, "내 PC에서 되는 것"과 "현장에서 동작하는 것"은 다른 문제임을 체감했습니다. 이를 통해 다양한 원인으로 실패하는 경우를 먼저 가정하고 설계하는 개발 습관을 갖게 되었습니다.