# 📑 Jugger

- 내가 쓴 메모를 빠르고 쉽게 확인하는 서비스

## 🛠 Tech Stack

![react](https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=react&logoColor=black)
![vite](https://img.shields.io/badge/Vite-646CFF.svg?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=typescript&logoColor=white)

![redux](https://img.shields.io/badge/Redux-764ABC.svg?style=flat-square&logo=redux&logoColor=white)
![reactrouter](https://img.shields.io/badge/React%20Router-CA4245.svg?style=flat-square&logo=reactrouter&logoColor=white)
![emotion](https://img.shields.io/badge/Emotion-DB7093.svg?style=flat-square&logo=styledcomponents&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat-square&logo=ESLint&logoColor=white)
![prettier](https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat-square&logo=prettier&logoColor=black)

![githubactions](https://img.shields.io/badge/Github%20Actions-2088FF.svg?style=flat-square&logo=githubactions&logoColor=black)

## 🌐 Front-End Developers

| 김민수                                  | 박현수                                  |
| --------------------------------------- | --------------------------------------- |
|                                         |                                         |
| [durumi99](https://github.com/durumi99) | [Jadest13](https://github.com/Jadest13) |

## 🤝 Convention

### ✔️ Commit Convention

- ✅ `[chore]` : 동작에 영향 없는 코드 or 변경 없는 변경사항(주석 추가 등)
- ✨ `[feat]` : 새로운 기능 구현
- ➕ `[add]` : Feat 이외의 부수적인 코드, 라이브러리, 새로운 파일 생성
- 🖼️ `[asset]` : asset (이미지, 아이콘 등) 추가 혹은 수정
- 🔨 `[fix]` : 버그, 오류 해결
- ⚰️ `[del]` : 쓸모없는 코드 삭제
- 📝 `[docs]` : README나 WIKI 등의 문서 수정
- 🎨 `[style]` : CSS 등 사용자 UI 디자인 변경
- ✏️ `[correct]` : 주로 문법의 오류나 타입의 변경, 이름 변경시
- 💯 `[test]` : 테스트 코드, 리팩토링 테스트 코드 추가
- ⏪️ `[rename]` : 파일 이름 변경시
- ♻️ `[refactor]` : 전면 수정
- 🔀 `[merge]`: 다른 브랜치와 병합

ex) `commit -m "{#issue number} [feat] user API 구현”`

### ✔️ Branch Convention

- `[feat]` : 기능 추가
- `[fix]` : 에러 수정, 버그 수정
- `[docs]` : README, 문서
- `[refactor]` : 코드 리펙토링 (기능 변경 없이 코드만 수정할 때)
- `[modify]` : 코드 수정 (기능의 변화가 있을 때)
- `[chore]` : gradle 세팅, 위의 것 이외에 거의 모든 것

ex) `feat/#1-user-api`

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
