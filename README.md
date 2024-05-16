# Manage Real Estates with Hyperledger
Đây là project về quản lý các thông tin bất động sản đơn giản với BlockChain sử dụng Hyperledger. Có thể thêm và chỉnh sửa thông tin về bất động sản, người sở hữu. Project sử dụng BlockChain với mục đích tăng độ tin cậy của hệ thống, dữ liệu cũng như là các thông tin được cung cấp bởi các bên.

## Folder Hierachy
Cấu trúc thư mục đúng và đầy đủ nó sẽ như thế này
```
.
└── hyperledger-real-estate/
    ├── postman
    ├── chaincodes/
    │   └── real-estate
    ├── backend/
    │   ├── src/
    │   │   ├── assets
    │   │   ├── controllers
    │   │   ├── network/
    │   │   │   ├── utils/
    │   │   │   │   └── index.ts
    │   │   │   ├── blockchainNet.ts
    │   │   │   └── userOfNet.ts
    │   │   ├── routes
    │   │   ├── schemas
    │   │   ├── services
    │   │   ├── types
    │   │   ├── validations
    │   │   └── server.ts
    │   └── wallet
    ├── frontend/
    │   ├── public
    │   └── src/
    │       ├── apis
    │       ├── assets
    │       ├── components
    │       ├── layouts
    │       ├── objects
    │       ├── pages
    │       ├── states
    │       ├── themes
    │       ├── types
    │       ├── utils
    │       ├── App.tsx
    │       └── main.tsx
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
Nên sau khi cài đặt xong mà thấy nó như thế này thì đã cài đặt đúng!!! Các folder trong `network` như là `bin`, `builders` và `config` nó chỉ xuất hiện khi đã được cài đặt, còn cài đặt như thế nào thì xem thêm ở bên dưới.

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
./start.sh new
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
3. Nhớ khởi động chaincode!! Dùng lệnh
```cmd
./start --help
hoặc
./start -h
```
Để hiển thị hướng dẫn khởi động netword, deploy chaincode. Trong phần hướng dẫn thì có các examples để sử dụng.

## Test API with PostMan
Trong folder `postman` có một file json của các requests về bất động sản cũng như là khởi tạo người dùng. Import file json vào trong postman để dùng nhanh. Các requests trong file này chỉ là tạm thời vì đang lưu `username` của user ở trong body để gửi về cho server thay vì là token.