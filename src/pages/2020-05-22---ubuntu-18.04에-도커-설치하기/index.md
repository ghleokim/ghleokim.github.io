---
title: "ubuntu 18.04에 도커 설치하기"
date: "2020-05-22"
draft: false
author: ghleokim
tags:
  - Docker
---

## docker installation: ubuntu 18.04 LTS

설치하기 전에 ubuntu 버전을 먼저 확인해봅니다.

`lsb_release -a`를 통해 확인할 수 있습니다.

```bash
$ lsb_release -a
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 18.04.1 LTS
Release:	18.04
Codename:	bionic
```

## Docker 설치하기

Docker를 설치하는 방법은 여러가지가 있지만 (공식문서 참고 → [링크](https://docs.docker.com/install/linux/docker-ce/ubuntu/)), 여기서는 그 중에서도 저장소로부터 설치하는 방법을 사용합니다.

### 구 버전 삭제하기

Docker의 예전 버전은 `docker`, `docker.io`, 또는 `docker-engine` 이라는 이름으로 불렸습니다. 만약 이것들이 설치되어 있다면 삭제해줍니다.

```bash
$ sudo apt remove docker docker-engine docker.io containerd runc
```

### Repository(저장소) 설정

만약 도커 엔진을 처음으로 설치하는 것이라면, 리눅스의 패키지 관리도구인 `apt`가 도커를 가져올 수 있도록 설정해줍니다. 설정하고 나면, 도커를 설정한 저장소로부터 설치하거나 업데이트할 수 있습니다.

1. `apt` 패키지의 인덱스 업데이트

    ```bash
    $ sudo apt update
    ```

    - `apt` 패키지는 인덱스를 가지고 있습니다. 이 인덱스는 `/etc/apt/source.list`에 위치합니다.
2. 저장소를 https로 사용할 수 있도록 다음의 패키지를 설치합니다:

    ```bash
    $ sudo apt install \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg-agent \
        software-properties-common
    ```

3. 도커의 GPG키를 등록해줍니다.

    ```bash
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    ```

    - 이 과정을 수행하고 나면 `apt-key`가 해당 인증 키를 가지고 패키지를 인증하게 됩니다.
    - 이 때 받은 키의 지문은 `9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88`입니다.
    - 이제대로 키가 설정되었는지 인증키의 마지막 여덟 글자를 통해 확인할 수 있습니다.

        ```bash
        $ sudo apt-key fingerprint 0EBFCD88
        pub   rsa4096 2017-02-22 [SCEA]
              9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
        uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
        sub   rsa4096 2017-02-22 [S]
        ```

4. 다음 명령을 통해 stable 저장소를 설정합니다. nightly 또는 test 저장소를 설정하려면 `nightly` 또는 `test` (동시에 사용 가능)를 `stable` 뒤에 붙여줍니다.

    ```bash
    $ sudo add-apt-repository \
        "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) \
        stable"
    ```

    - 이 때 `lsb_release -cs` 부분은 ubuntu 배포판의 이름을 돌려줍니다. 현재 사용하고 있는 버전은 18.04이므로 `bionic`이 될 것입니다.
    - `deb` 뒤에 따라오는 `[arch=amd64]`는 호스트 머신의 아키텍쳐에 따라 달라집니다. 이는 `uname`으로 확인할 수 있습니다. 다른 아키텍쳐의 경우 어떻게 사용하는지는 공식 문서에 나와 있습니다.

        ```bash
        $ uname -m
        x86_64
        ```

    - 만약 여기서 오타가 나면 잘못된 주소로 인해 설치 과정에서 오류가 납니다. 만약 잘못 입력했다면 `/etc/apt/source.list`에서 해당 라인을 지워준 후 다시 명령어를 실행할 수 있습니다.

여기까지 설정하고 나면 이제 `apt`를 통해 도커 설치가 가능합니다.

### Docker 설치하기

1. `apt` 패키지의 인덱스 업데이트

    ```bash
    $ sudo apt update
    ```

2. 도커 엔진의 최신버전, containerd를 설치합니다.

    ```bash
    $ sudo apt install docker-ce
    ```