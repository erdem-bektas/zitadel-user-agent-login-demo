# Zitadel React Integration Demo

Bu proje, self-hosted bir Zitadel kurulumu ile (User Agent / PKCE akışı kullanarak) React üzerinde kimlik doğrulama (Login / Logout / Oturum Yönetimi) işlemlerinin nasıl yapılacağını gösteren örnek bir uygulamadır.

## 🔗 İlgili Backend Projesi

Bu frontend projesi, güvenli API istekleri (Protected Endpoints) ve role dayalı yetkilendirme senaryoları için **[zitadel-api-app-demo](https://github.com/erdem-bektas/zitadel-api-app-demo)** adlı Node.js (Express) backend projesi ile birlikte çalışmak üzere tasarlanmıştır. Backend tarafındaki token doğrulama süreçleri için ilgili repoya göz atabilirsiniz.

## Kurulum ve Çalıştırma

Projede Vite kullanılmıştır. Paketleri yüklemek ve geliştirici sunucusunu başlatmak için şu komutları kullanabilirsiniz:

```bash
pnpm install
pnpm run dev
```

## Çevre Değişkenleri (`.env`)

Uygulamanın Zitadel ile iletişim kurabilmesi için projenin kök dizininde bir `.env` dosyası oluşturmalısınız (örnek olarak `.env.example` dosyasını kullanabilirsiniz). Bu dosyanın içindeki ayarların açıklamaları şu şekildedir:

### `VITE_ZITADEL_AUTHORITY`
**Açıklama:** Self-hosted Zitadel sunucunuzun ana (issuer) adresidir. Uygulama, OIDC yapılandırmalarını (discovery endpoint vb.) bu adresten çeker.
- **Örnek Değer:** `https://auth.domain.com` veya `http://localhost:8080`

### `VITE_ZITADEL_CLIENT_ID`
**Açıklama:** Zitadel arayüzünde (Console) projenize eklediğiniz "User Agent" tipindeki uygulamanın benzersiz kimliğidir. Zitadel, hangi uygulamanın giriş yapmak istediğini bu kimlik ile anlar.
- **Örnek Değer:** `298471239847129384@my-project`

### `VITE_ZITADEL_REDIRECT_URI`
**Açıklama:** Kullanıcı Zitadel ekranında başarılı bir şekilde giriş yaptıktan sonra uygulamanızda döneceği adrestir. Bu adresin aynısını Zitadel Console üzerinden uygulamanızın **Redirect URIs** kısmına eklemelisiniz.
- **Standart Değer:** `http://localhost:5173/callback`

### `VITE_ZITADEL_POST_LOGOUT_REDIRECT_URI`
**Açıklama:** Kullanıcı çıkış (logout) işlemini tamamladığında Zitadel tarafından tekrar uygulamanıza yönlendirileceği adrestir. Bu adresin de aynısını Zitadel Console üzerinden uygulamanızın **Post Logout URIs** kısmına eklemeniz zorunludur. Aksi halde `invalid_request` hatası alırsınız.
- **Standart Değer:** `http://localhost:5173/`

## Proje Yapısı

- `src/auth/AuthProvider.tsx`: `react-oidc-context` tabanlı ayarları içeren Authentication sağlayıcısı.
- `src/App.tsx`: Tüm sayfaları ve korumalı (Protected) rotaları yöneten ana bileşen.
- `src/pages/`:
  - `Landing.tsx`: Kullanıcının giriş yapabileceği herkese açık ana sayfa.
  - `Callback.tsx`: Giriş sonrasında başarılı dönüşlerin yakalanıp işlendiği köprü sayfa.
  - `Protected.tsx`: Sadece giriş yapmış kullanıcıların görebildiği, profil ve token detaylarını gösteren sayfa. 
- `src/index.css`: Tüm uygulamanın görünümünü, karanlık mod ve glassmorphism özelliklerini içeren Vanilla CSS.
