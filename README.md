# NFT-Marketplace
Dự án này là về sàn giao dịch __NFT__ sử dụng Hyperledger, NodeJS và React. Trước khi chạy thì có một số lưu ý, nhớ đọc trước khi cài.

## Folder Hierachy
Cấu trúc thư mục đúng và đầy đủ nó sẽ như thế này
```
.
└── NFT-Marketplace/
    ├── chaincodes/
    │   ├── account
    │   └── nft
    ├── backend/
    │   └── src
    ├── frontend/
    │   └── src
    └── network/
        ├── bin
        ├── builders/
        │   └── ccaas/
        │       └── bin
        ├── config
        ├── core/
        │   ├── addOrg3
        │   ├── configtx
        │   ├── docker
        │   ├── organizations
        │   ├── scripts
        │   ├── system-genesis-block
        │   ├── network.sh
        │   └── start.sh
        └── install-fabric.sh
```
Nên sau khi cài đặt xong mà thấy nó như thế này thì đã cài đặt đúng!!! Các folder trong `network` như là `bin`, `builders` và `config` nó chỉ xuất hiện khi đã được cài đặt.

## Note
1. Trước khi chạy thì phải vào trong thư mục `network` trước.
```cmd
cd network
```
2. Để có thể chạy được thì buộc phải cài đầy đủ Docker Images và Binaries. Lưu ý là tải binaries thôi, docker images mình có rồi.
3. Nếu như bị lỗi `-bash: ./*.sh: Permission denied` thì gõ lệnh
```cmd
find ./ -type f -name "*.sh" -exec chmod +x {} \;
```
4. Trong trường hợp mà phiên bản của docker image nó không __sync__ với nhau thì dùng lệnh bên dưới để remove, sau khi remove xong thì tải lại docker images.
```cmd
docker rmi -f $(docker images -aq)
```
Tải lại docker thì xem tiếp biên dưới. Khi mà tải xong các docker images cần thiết thì khi start net nó sẽ cài thêm một số docker images khác nữa, cứ để cho nó cài.

## Install
1. File script để cài dockert images, binaries, fabric-samples. Trong repo thì nó có sẵn rồi, trong trường hợp không có hoặc lỡ tay xóa mất tiêu thì vào folder `network` rồi chạy lệnh
```cmd
curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
```
2. Khi có được file `install-fabric.sh` thì tải binaries tương ứng
```cmd
./install-fabric.sh binary
```
3. Sau khi cài xong thì ổn rồi đó, giờ thì vào trong thư mục `core` để bắt đầu deploy NET, Channel và Chaincodes
```cmd
cd core
./start.sh
```
4. Sau khi xanh lè hết thì bắt đầu thôi!!!

## Start the project
1. Khởi động API App trong folder `NFT-Marketplace/backend`
```cmd
npm install
npm run dev
```
2. Khởi động Client App trong folder `NFT-Marketplace/frontend`
```cmd
npm install
npm run dev
```

## API Endpoints (Temporary)
Hiện tại thì có một số endpoints từ `test.routes.ts` có thể test như sau
1.  ENROLL ADMIN (RUN THIS FIRST)
```
Endpoint: http://localhost:7500/v1/test/admin
Method: POST
Authorization Require: NONE
Body: {
  "org": number
}
```
2.  Register User
```
Endpoint: http://localhost:7500/v1/test/user
Method: POST
Authorization Require: NONE
Body: {
  "username": string,
  "password": string
}
```
3.  Create Account
Endpoint này trong tương lai sẽ được gộp chung với `Register User`.
```
Endpoint: http://localhost:7500/v1/test/account
Method: POST
Authorization Require: NONE
Body: {
  "username": string,
  "balance": string
}
```
4.  Get Accounts
```
Endpoint: http://localhost:7500/v1/test/accounts
Method: POST
Authorization Require: NONE
Body: {
  "username": string
}
```