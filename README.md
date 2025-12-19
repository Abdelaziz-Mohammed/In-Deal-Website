app/
├── layout.tsx
├── globals.css
├── page.tsx # Redirect → /[locale]/auth/login
├── [locale]/ # 🌍 LOCALIZED USER APP ONLY
│ ├── layout.tsx # next-intl provider
│ ├── page.tsx # Redirect → auth/login
│ ├── auth/ # PUBLIC USER AUTH
│ │ ├── layout.tsx
│ │ ├── login/
│ │ │ └── page.tsx
│ │ ├── register/
│ │ │ └── page.tsx
│ ├── (protected-app)/ # USER PROTECTED ROUTES
│ │ ├── layout.tsx # User auth guard
│ │ ├── ...
├── admin/ # 🚫 NOT LOCALIZED
│ ├── layout.tsx
│ ├── page.tsx # Redirect → /admin/auth/login
│ ├── auth/
│ │ ├── layout.tsx
│ │ ├── login/
│ │ │ └── page.tsx
│ │ ├── register/
│ │ │ └── page.tsx
│ ├── (protected-panel)/
│ │ ├── layout.tsx
│ │ ├── ...
