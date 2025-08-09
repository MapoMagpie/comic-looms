// ==UserScript==
// @name               Comic Looms
// @name:en            Comic Looms
// @name:zh-CN         漫画织机
// @name:zh-TW         漫畫織機
// @name:ja            コミック織機
// @name:ko            만화 베틀
// @name:es            Comic Looms
// @name:ka            Comic Looms
// @namespace          https://github.com/MapoMagpie/eh-view-enhance
// @version            4.11.9
// @author             MapoMagpie
// @description        Manga Viewer + Downloader, Focus on experience and low load on the site. Support you in finding the site you are searching for.
// @description:en     Manga Viewer + Downloader, Focus on experience and low load on the site. Support you in finding the site you are searching for.
// @description:zh-CN  漫画阅读 + 下载器，注重体验和对站点的负载控制。支持你正在搜索的站点。
// @description:zh-TW  漫畫閱讀 + 下載器，注重體驗和對站點的負載控制。支持你正在搜索的站點。
// @description:ja     サイトのエクスペリエンスと負荷制御に重点を置いたコミック閲覧 + ダウンローダー。あなたが探しているサイトを見つけるのをサポートします。
// @description:ko     이 유저 스크립트는 특정 사이트들 에서 갤러리 또는 작가의 홈페이지를 빠르고 편리하게 탐색할 수 있도록 하며, 일괄 다운로드 기능을 지원합니다. 브라우징 경험과 낮은 사이트 부하에 중점을 둡니다.
// @description:es     Este Userscript permite una navegación rápida y conveniente por galerías o páginas principales de artistas en ciertos sitios, con soporte para descargas por lotes, enfocándose en la experiencia de navegación y en una carga baja para el sitio.
// @description:ka     Manga Viewer + Downloader, Focus on experience and low load on the site. Support you in finding the site you are searching for.
// @license            MIT
// @icon               data:image/x-icon;base64,AAABAAEAQEAAAAEAIAAoQgAAFgAAACgAAABAAAAAgAAAAAEAIAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAADF2+r/xdzo/8Xc6P/F3Oj/xdzo/8Xc6P/F3Oj/xdzo/8Xc6P/F3Of/xdzn/8Xc5//F3Oj/xdzo/8Xc6P/F3Oj/xdzo/8Tb5//E2+f/xdzo/8Xc6P/F3Oj/xdzo/8Xc6P/F3Oj/xdzo/8Xc6P/F3Oj/xdzo/8Xc6P/F3Oj/xdzo/8Xc6P/F3Oj/xdzo/8Xc6P/E2+f/xNvn/8Xb6P/E3Of/xNvn/8Tb5//F3Oj/xdzo/8Xc6P/F3Oj/xdzo/8Xc6P/F3Oj/xNvn/8Tb5//E2+f/xNvn/8Xc6P/F3Oj/xdzo/8Xc6P/F3Oj/xdzo/8Xc6P/F3Oj/xdzo/8Xc6P/F3Oj/xdvp/8Xd5//F3eb/xd3m/8Xd5//F3ef/xd3n/8Xd5//F3ef/xd3n/8Xd5//F3ef/xd3n/8Xd5//F3eb/xd3m/8Xd5v/F3eb/xd3m/8Xe5//F3eb/xd3m/8Xd5v/F3eb/xd3m/8Xd5//F3eb/xd3m/8Xd5//F3eb/xd3m/8Xd5v/F3eb/xd3n/8Xd5//F3ef/xd3n/8Xd5//E3OX/w9vm/8Tc5//D2+X/wtvk/8Xd5//F3eb/xd3m/8Xd5v/F3eb/xd3m/8Xd5v/F3ef/xd3n/8Xe5v/F3uf/xd3m/8Xe5v/F3eb/xd3n/8Xd5v/F3eb/xd3n/8Xd5//F3ef/xdzo/8Xb6f/F3eb/xd7l/8Xe5f/D3uX/xN7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xN7l/8Te5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5P/F3uT/xd3k/8Xd5P/F3eT/xd3k/8Xd5P/E3OP/zeXr/9Dm6//N4uf/0uju/9Hq8f/H4On/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5v/F3ef/xd3n/8Xd6f/F2ur/xd3n/8Xe5f/E3uX/w97l/8Pe5f/F3uX/xN3k/8Xd5P/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uT/xd3k/8Xd5P/F3eT/xd3k/8Xd5P/F3eP/xN3j/8Td4//E3eT/xN3k/8Td5P/E3eT/xN3l/8Pe5f/D3ub/xN/n/8Tf6P/E4Oj/xOHp/8Xh6//F4Or/0ez2/5aquv9YZ4X/YXGQ/1Jbd/+LmKj/yd3l/8be5//F3uT/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/E3uX/xd7m/8Xd5//F3ej/xdrq/8Xd5//F3uX/xd7l/8Te5f/F3uX/xd7l/8ji6v/G4Oj/xN3l/8Tc5P/E3eT/xN3k/8Pd5f/E3uf/xN/o/8Tf6P/E3+r/xOHq/8bi7P/G4+z/x+Tu/8jl7v/J5e//y+Xv/8vl7v/M5e3/zeXs/87k6v/P4uj/z+Dj/9De3//O2dr/zdXV/8zRzv/IysX/xMK8/8rEvv+Ng4P/T2yk/01spv8ZKmj/DCBs/3yFmP/b8fj/w93p/8Td5f/E3eT/xd7l/8Td5P/E3eT/xN3k/8Xe5f/F3uX/xd7l/8Xe5f/E3uX/w97l/8Te5f/F3uX/xd7l/8Xe5f/F3ef/xd3n/8Xb6v/F3ef/xd7l/8Xe5f/F3uX/xt7m/8fd5P+6ztP/xNnd/8zj6f/N5/D/zubu/87l7P/O4+j/z+Hk/8/e3//O2tr/ztXU/8vQzv/Iy8f/xcS+/8K7tP+9s6v/uayj/7Okmv+unZL/p5WK/6CNg/+ZhXz/kn14/4p2dP+CcXT/e21y/3Rpcv9vZXL/aWRy/2Nhdf9hZH3/VFNn/0BSf/9JZqf/IjNy/x45jf9DP1f/tqid/9DT0P/P4+r/yePv/8Pd5v/G4Oj/yuTs/8rj6//D3eT/xN3k/8Xe5f/E3uX/w97l/8Te5f/F3uX/xd7l/8Xe5f/F3uX/xd3n/8Xd6P/F2ur/xd3n/8Xe5f/F3uX/w9zj/8/n7/+Il6v/QVF8/y07af9laHv/r6KZ/5+Ph/+Zh3//kH95/4l4dP+EdHT/fW9z/3drcv9yaXP/bGZ1/2Zjd/9fYHj/Wl99/1phg/9VYYf/UWGN/1BklP9PZpr/T2mi/01sqf9NcLD/UXS5/1F4vv9Te8P/VX3H/1eAzP9Ygc3/XojX/0lpr/8+Tnv/VXOv/yU1dv8eLWn/GiZT/y8zWP9uW2H/n4yE/8XAuf/V4uT/xNnf/7HEyf+2yM3/0eXq/8ri6f/E3eT/xd7l/8Te5f/E3uX/xd7l/8Xe5f/F3uX/xd7l/8Xd5//G3ef/xdrq/8Xd5//F3uX/xd7l/8Lb4//Q6e//gJGo/0dlqf8fOIf/GSNY/0ZRfv9RaKD/UWqi/1Bvq/9Rc7P/U3e8/1R7w/9Vf8j/V4HN/1qF0/9dh9b/XorZ/12K2/9hjN7/Y47f/2SQ3v9lk97/aJLg/2mT3/9pkt3/aJHd/2iR3f9pkdz/aJHa/2qR2v9pkdn/Z47X/2WN2P9IZrH/RVqK/1t8t/82S4n/HShZ/zdLi/8iNnf/FS99/x4ua/87Oln/alxk/0BGYf9DWpD/OUuC/0tTcv++0dr/x+Hp/8Td5P/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3ef/xt3o/8Xb6v/F3ef/xd7l/8Xe5f/D3OP/z+nv/5qruP9HZab/Ijp9/xcgUP9QcLf/apbl/2OO2/9kj9v/Y47a/2SP2v9jj9n/ZI3W/2OJ0v9hhs7/XILJ/1t/xP9ZfL//V3i7/1Rzs/9TcK7/T2yo/0tnof9GYZr/Q1qT/z9Vi/86T4P/OEp7/zVEdP8xQG3/LDpl/ys1Xv8pMlj/ICJD/zE8Xv9KYpX/MEN2/x8rV/8fLl7/IzBq/yk+h/8kPoz/GzmN/xUxfv8ZLW7/Kjx7/yU5eP8XJF//sMHJ/8vl7P/E3eT/xd7l/8Xe5f/F3uX/xd7l/8Te5f/F3uX/xd3n/8be6P/F2ur/xd3n/8Xe5f/F3uX/xd7l/8fh6f+90df/Wnaj/zFHf/8YH07/MkN+/z9UiP9CVor/P1OG/z5Pf/8xPm3/KzVg/y43X/8zOl7/NDpa/zE0VP8sLkz/LS1I/zAtR/8yL0b/MzBH/zYyR/84NUr/PTpL/0I/T/9JRlb/UU5a/1lXYP9iXmf/aWdu/3Nyd/99fYD/hIWJ/5manP9iZ3b/S2qq/1iAyf84SYH/Z1df/0xJZf8sM2D/KjZv/yo1cf8hMXL/JD2H/yU/jv8WJGH/Qklo/8zi6P/E3eX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xd5//F3ej/xdrq/8Xd5//F3uX/xd7l/8Xe5f/D2+P/0Onv/4mcrv9JZaL/JC9i/xosbv8aLnX/FiFU/x4pZv8ZIFH/aGl2/42Pl/+Dgoj/dXB3/3V0ev+Pj5D/rLGx/663uv+zvMD/usPH/77Kzv/C0NT/xtXY/8ra3f/M3uH/zuHl/9Dk6f/S5+z/0unv/9Tq8f/V6/L/0+zz/9Dq8v/e+P3/hJar/1V+xv9gj9z/Mz9v/7Oonv/SzML/xMnJ/2x4kv85T47/QlyX/yMwaf8hM3f/DRdL/4yZo//R6/L/wtvi/8Xe5f/F3uX/xd7l/8Xe5f/E3uX/xd7l/8Xe5f/F3ef/xd3n/8Xa6v/F3ef/xd7l/8Xe5f/F3uX/xd7l/8Xf5v/H3OT/W2uM/zE/c/8mNGz/IjRy/xooXv8aJ2j/IC1g/8XY3v/g+v//cIKc/0pop/8xRYH/Hy9v/217lv/X8ff/y+Xt/8rm7v/J5O3/yOPr/8fh6v/G4On/xd/n/8Te5f/D3eX/w9zk/8Lb4//B2uL/wdrh/8HZ4f++19//zeTr/3yNof9Se8P/XofM/yIya/8rPHL/VGKI/56ruP97hJT/YozU/3er+P8nP4n/MT1q/56stf/I4Of/xN7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd3n/8bd6P/F2ur/xd3n/8Xe5f/F3uX/xd7l/8Xe5f/C2+P/0Oft/3SHov9Vgcv/PFeY/x0ucf8gM3j/EyVr/3N7kf/P5u3/zOPp/36Nof9Sdrz/M0qL/w4gbf9KVXX/zuTp/8DY4P/C2+P/xNzl/8Xe5//G4Of/yeLp/8ni6//L5Oz/zufu/8/o7//Q6vD/0uvx/9Ts8f/U7PH/0unv/9/2+f+Glqn/UnzD/12Hzf8lPH//HDiJ/xUuf/8TKXP/HCxo/y9Ad/9XdrX/IjyH/0dWgP/Z7/H/w93l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xN7l/8Te5f/F3uX/xd7l/8Xd5//F3ej/xdrq/8Xd5//F3uX/w97l/8Pe5f/F3uX/w9zk/83l6/9zh6X/V4bR/z1cof8fOIf/IDN4/w8bWP+hqbb/2fL4/8/n8P/C1tv/W3Sr/0Fdo/8TJGb/orC9/973+//R6O7/0enu/8zh5v/J3eL/xtjc/8LS1v+7zNL/tcXM/66+xP+pt8D/oK65/5elsf+Om6z/g5Gl/3iGnv94hZ7/Ul5+/1qEyf9bhsr/Jjt//yI/kP8lQI//JUGR/yM/kf8aM4H/LUKG/yQ8hP9DU33/zOHl/8Td5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Te5f/D3uX/xd7l/8Xe5f/F3ef/xt3n/8Xa6v/F3ef/xd7l/8Pe5f/D3uX/xd7l/8Pc5P/O5ev/c4el/1eF0P89W5//HzN+/x0qaf8TIWT/XWJ2/8PS0v+1xMj/pa+1/0tcif8xRH7/Eh1R/2x2i/97iqD/aHSM/2Fuif9jdpn/Wm2U/1Fmk/9MZZT/R2GV/0pkmv9OaqH/Q1+Z/0JenP9CYJ//RmOi/0hmpf9Ka6r/T3Ct/0FWh/9chMj/XIfM/yM1cv8XKWL/HTJz/yE4f/8jO4X/ITyL/y9JkP8iN3//RVSA/87k5//E3eX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/E3uX/xd7l/8Xe5f/F3uX/xd3n/8bd6P/F2ur/xd3n/8Xe5f/D3uX/w97l/8Xe5f/D3OT/zuXr/3OHpP9WhM//PVqd/xwvef8bKGr/JDVx/zhPgv9OZZj/R2Gb/0tnoP9KZ6P/VHKx/1p7u/9Qc7X/VXe6/1Zzrv9ge6//Y4TD/3CPw/+HptL/iqjR/5q22f97lLr/YXag/7LH3P+yyNv/t8ve/7vP3v+90d3/zODm/56tuP83QGD/XojM/1mDyf8iLVf/ICta/yIvZf8eLWr/Hi1r/xstcP8pPHn/IjZ8/0VUgP/O4+f/xN3l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xd5//F3ej/xdrq/8Xd5//F3uX/w97l/8Pe5f/F3uX/w9zk/83l6/9yhqP/VoPP/0Jdnf8iL2D/GCNX/yg4av9be7n/WnKf/4OWrf9ccpT/TGij/yw/eP9KVnj/t8LE/3qElv9PW3P/u8PC/1Rbcv9dY3P/sre2/5ykqP+hqaz/eYGN/y82Uv+Bh5L/fYSR/3J5iP9pcYP/YWl+/1xmfP9JUW3/Ji1Q/1+Kzv9Xgcb/PVCE/zBFgf8kMWX/JDuF/yQ/jv8gN4H/JDl//xoveP9HV4H/z+Pn/8Pd5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3ef/xd3n/8Xa6v/F3ef/xN7l/8Pe5f/D3uX/xN7l/8Lb4//R6O7/eY2p/1F+zP9LaKX/PFCA/xohS/8gLF3/Kjt0/y84Yf9HTm7/Ljll/yw9d/8hLmb/LDlq/0JOe/89S33/MUB2/zpJfP85Sn7/MkN6/zJDef8wQ3n/Lj93/zNCe/84SH7/LD12/y0+ef8vPnv/MEB9/zJAfv8xP3//MEGC/zE/dv9dhsn/WobM/yAzdP83Snr/JjNg/xooZ/8gN37/IjqI/yQ+jf8TJ3H/SVmD/83k5//D3eX/xd7l/8Te5f/D3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd3n/8Xd6P/E2ur/xd3n/8Te5f/D3uX/w97l/8Td5P/G4Of/wtXd/1Jggv9YhtT/RF6a/yo5bP8sPHH/Qluc/zxVkv9BWpn/P1ST/0VZlf9GWI7/Q1WK/zVIfP85SoD/NkV4/zZEc/83Q3D/OENs/ztEa/86RGf/OkVm/z9JZ/9CS2n/RE1r/0dQbf9JUm3/TVZw/1Nbcv9ZYXb/XWV5/2Rtf/9OV3H/WoXL/1mFyf8lO4D/JTx+/1dmiv9FTGf/Nj1Y/y43Yf8kMmj/FSRo/0pahf/M5Of/w93l/8Xe5f/E3uX/w97l/8Xe5f/F3uX/xN7l/8Te5f/E3uX/xd7l/8Xd5//F3ej/xdrq/8Xd5//E3uX/w97l/8Pe5f/D3OP/zujv/5uuuf8xQWv/YI7Z/0Jdm/82UI3/GShc/x4rZP8WH0r/FxxB/wYCAv8ODyb/DA86/zU2Tf+PkJb/Jyk0/0BBTP+WmqD/maCl/5adov+Yn6T/maGn/5miqP+boqr/m6Or/5qkrP+apKz/mKKr/5ehqv+XoKr/lp+q/5Gcp/+Un6v/aHGJ/1eDyP9ahsr/Jz2B/xcxhP9QVnf/VFlr/z1BV/8vNEz/KjZp/xknZP9LWob/y+Ll/8Lb4//F3uX/xd7l/8Te5f/D3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3ef/xd3n/8Xa6v/F3ef/xd7l/8Pe5f/D3uX/w9zk/8zm7f+ou8P/M0Bm/1+N2v9BW5L/GyRL/wwSOP8VHEb/JC9d/xYaOP8SEyf/IidN/yEoWP8zOl3/aW+J/01VcP9VXHn/WmKB/1Jaef9OVnj/S1R2/0hTc/9IUnL/SVNz/0lSdP9HUXP/RU9y/0NMcf9CTHL/Qkxy/z9KcP8/SW7/Pkhu/zY/Zf9bh8v/WobL/yY9gP8eOIf/NT5m/zY9W/83P1v/OUFd/yg1a/8VI2H/TVyF/9rw8//K4uz/xNzj/8Xe5f/F3uX/xN7l/8Xe5P/F3uX/xN3k/8Xe5f/F3uX/xd3n/8bd6P/F2ur/xd3n/8Te5f/D3uX/w97l/8Xe5f/F3+b/xNrg/1Rjgv9Zh9X/PlmV/ztPiP8tPG3/KTVg/yY4df8XGT3/RE9z/1Bfhf9UYoj/UV+H/0VRef9LVXz/SVR5/0RQdv9CT3f/QU14/0FNev8/Tnr/P096/0BPef8/Tnn/PEp5/zlIdf82RXX/NEJ2/zFBc/8uPnD/LTxv/yc3av8nM2L/XYjM/1uHy/8mPX//HTmH/yQxY/8kMFf/HCNI/ykqPP8fIDj/EBY+/yAmTP9MUWD/sMHL/8vj7f/B2uP/xN7l/8Xe5//G3+j/xuDo/8nj6//F3+b/xN3k/8Xd5//G3ef/xNvq/8Xd5//E3uX/w97l/8Pe5f/F3uX/wtri/87k6v91iab/U4LP/0RfoP8pQIP/JTyB/zhKhf8tPXf/IjR8/xolXP8UGTj/GiRO/xQeRv8qNVz/LTpg/zA9Zf8yPmb/Mz9n/zRAZ/81QGb/OD9j/zk/X/87QFz/PEFa/z5CWf89QVb/Pj9U/0FBVv9JR1z/UExf/1RRYf9jXmv/UFFm/1iDyf9ahcn/JTt//yA7if8cJU//FBpB/xQZNf8cJlD/IzNx/yM0bf8bJFn/Bgs8/0NJYv/R5Or/0Obs/8zi5//J3uT/xtrf/8TY2v+4ytD/x93k/8rj6v/F3Ob/x97o/8Xa6v/F3ef/xd7l/8Te5f/E3uX/w9zj/8jh6f/a8vf/domn/1SDz/8/Wp//GS12/xs2g/8mPoL/Fidb/wogaP8cJ0//DxIl/x4hM/9iXFz/e3R0/4F5eP+Cenj/h3x5/4p9ev+Mfnn/jH55/4+Aef+Sg3r/lYV8/5eGfP+aiX3/nIt+/5yNf/+fj4H/opKF/6SVif+snZD/hn13/1hbav9ij9j/YI/U/ylDiP8ZM4P/SE9r/3yBiP8pNV3/OVOU/0tpq/8zTI3/Hixp/xwiVv8cIk7/S1Vx/1Nef/9LVnr/RlN5/0FOeP8+S3j/HShO/2Bqff/J3uf/xt3n/8bd5//F2ur/xd3n/8Xe5f/E3uX/xNzk/8/m7/+zxc7/nKmw/2Jxjv9Yh9H/Plqe/x0weP8dNoT/SVJ5/46Pk/+UlJv/rKur/7Kxr/+5trX/1c3I/9TMx//X0Mr/29XP/9/a1f/i3tj/5uLb/+jj3v/p5uL/7enk/+/r5//u7Oj/8O7r//Hv6//y8Oz/8vDt//Lw7f/x8O3/9/Xu/05Taf8FDS3/OlCK/zRLi/8QFz//DRNA/z1CWP+DiZL/PU+A/0dlqv9Sb6//JzZs/zxXoP9WftT/VHzO/094zP9OeM7/U3zT/1aA2P9diN//XYfc/05wqP9JZ4n/hpen/9Hn8f/E2+X/xdvq/8Xd5//F3uX/w9vj/9Dn8P+QoLL/HydJ/wsMMf8vP23/Zprh/z9ep/8bLXX/GiJP/6yrqf/d3NX/0c/M/8zKx//Ry8j/zsrF/8bCvv/FwLz/w765/7+5tP+8ta7/uK+n/7Kqov+tpJz/qJ+X/5+blP+clY7/mZCH/5WLgf+RhXv/jIB2/4h7cv+Ddm//f3Ns/3NoZf9DTm7/OEp2/zdIef86TH//RFeH/zdGdf8HDDH/JStL/0daiv9DYKn/SmSl/xohSP9AU3X/aoy4/2OArP9kgqz/aISr/2mFqv9th6r/aYKi/1pzk/80RGb/ZXWH/77T3f/J3+n/xt3n/8Xa6v/F3ef/xN3j/8vk7P+zw87/Kzlj/yAybf8fLGD/Fxw7/zhOhv8xQW//FhxE/xkZMf8sLD3/NDVI/yIpRf8fIjb/Qj1H/09IUP9OSE//T0lQ/1BLUv9RS1X/UU1X/1JPW/9SUF//UVFj/05QZ/9LUWn/T1Vs/1Rab/9VXHP/V113/1hhev9YZX//WGaG/1tskf9OXYT/WXu4/2+f7f9rmeH/Z5La/2qX4f9Naab/DxM2/z5IYf9TZpD/ZYzK/2GCtP82RHD/IzVs/yU1a/8fKU//HyZE/6Ovuv+0xs//tsbO/7DAyf+cqrb/iJCd/8PX4f/L4uv/xN3k/8fe5//E2ur/xd3n/8Lb4v/T7PP/dYGT/yU6df8kNXf/LTtw/0xmlv9PaqH/U2+g/1d0pf9ee7L/X321/2B+tv9ggLz/YoLB/1+Bwf9fgML/XYDD/11/w/9bfsb/W3/G/1x+yP9afcf/W37G/1p/yP9Xfsr/VX7K/1V9yv9VfMf/UnrF/1F5xf9RecP/TnjB/092vf9Rd7v/S2yu/zFAav9GVXX/XXaj/1Ztmf9FUnj/PUp1/xgiT/+DjZ7/dIOh/16FwP9vk8b/PU5//01bhf9iea3/NUhx/zE5V//H2+T/zefu/8nj6v/M5u3/zeXt/6a2wf/K4ur/xNvl/8Xe5f/H3uf/xdrq/8Xd5//C2+L/0erw/2dziP8tQX3/JDh7/0BVgv9PZpj/U3Co/1BqoP9RaqD/TWSa/01jmf9KYZb/R12U/0ZZkf9GWI7/R1iM/0ZYjP9HWIv/SFmK/0dZiP9LW4f/Tl2H/1Ngif9WY4r/WWaM/11pj/9ebY//ZHCQ/2p0kv9teZX/cnuX/3Z+mf95gpr/f4ea/4eNn/8hLFL/CxQ2/2GJ0f9XgMn/Jzd1/zFFif8aJ1b/XGV6/zI5U/8vQn3/T3C3/zdKhP94f5b/bXmS/wsUPf9FTWz/y+Do/8Tc5P/E3eT/xd7l/8Pa4v+drLj/yN7n/8Xd5f/F3uX/xt7n/8Xa6v/F3ef/wtzi/9Hq8f+DkaL/Okt4/y8/dP8qN2T/JSxO/zNBb/8vPm//M0Ny/1h2vv8qNmf/GCBV/0JGX/+QjIn/2dfR/+3s5P/t7OX/8vDs//X07//49vH/+vjz//389/////n////7/////v//////////////////////////////////////////////////////1M/K/3Byf/9ahc3/XIXK/y9Hj/8fOI3/UFdy/5eao/9RV2n/GSBJ/yozWP8kL1f/KDJi/z1DXv8eIz//eIWV/9Lr8f/C2+L/xd7l/8Xe5f/E3eX/m6y3/8fd5f/F3uX/xd3n/8Xd6P/E2ur/xd3n/8Td5P/H4Of/wNXg/1FZcf80P2H/GyZg/ys8av9chsn/OFGR/zZKgf9fiNr/GyVS/w0UPf88PFP/g3x6/7ewrP/Fvrj/wLmz/761r/+6saz/uK6o/7Sqpf+wpqL/rKKf/6ifnP+km5j/n5eU/5yUkP+XkIz/lI2J/5KLhv+NhYH/iYF//4Z/fv+DfHz/fnp6/4yHhf9dX23/WYXN/1qDx/8zTpf/HDKC/1xecf/IyMn/Zml9/yEmRf8/PEH/LCxF/1hjgP/M4ej/vtHZ/8Tb4//G4Ob/xd7l/8Xe5f/F3uX/xt/m/5ytuP/F2+T/xd/m/8Xe5v/H3ef/xdrq/8Xd5//F3uX/w93k/8vj6/+90Nn/a3eK/01Taf9EU3j/YJLc/zlSj/8qPHD/WH3H/yEnT/8hJj//HyIx/zM1Qv9CQUz/QUBL/0A+Sv8+PEn/PTxJ/0A9R/9BP0f/QT9I/0JARv9DQkf/RURJ/0ZETP9GR03/R0hO/0lLUv9NTVT/TU5U/01OU/9MTlT/S01W/1BSWv8gJTv/FiFE/2CLz/9bhcz/JTRv/xceTP8IEUD/ISZD/1BVZv9DQ1H/S0tX/09UY//F2eP/xd7l/8ji6f/G3+b/xd7l/8Xe5f/F3uX/xN3k/8fg5/+gsLr/xNri/8Xf5v/F3uX/x97n/8Xa6v/F3ef/xd7l/8Xe5f/E3eT/yePq/8/p7//Y7/L/doun/1aFzv89WJP/IzBf/yg5av8XHT7/MkFu/1JSXv+Bf4H/qqip/6Sgof+loqb/pqar/6mprP+qqq3/q6qr/6yqqv+urKv/r6yp/7Ctqf+xrqz/sK+u/7Gxsf+0s7H/trOw/7eysP+3s7H/tbGv/7a0sv+jo6X/KS9R/xwkRP9hjNL/WYPI/zdLfP9FYZX/FShp/3+Opv/P3uH/S0pU/01NV/9eZG//0ejy/8Td5P/E3eT/xd7l/8Xe5f/E3uX/xd7l/8Td5P/I4ej/obC7/8PZ4P/G4Ob/xd7l/8fe5//F2+r/xd3n/8Xe5f/F3uX/xd7l/8Td5P/A2uL/zOTo/3GGov9YhtL/OlGK/yMyXf8iLFf/CQom/xQYM/8eHCf/Qz0+/2pmZP9oZGX/Z2Zo/2Nmav9lZ2n/Z2dp/2ppaf9ramf/a2pm/2xpaf9raWf/amlm/2poZv9qaGX/a2Zi/2tmYP9rZV//aGNf/2ZhXv9jXln/TlFb/yk7bv8dJU7/Yo7T/1mDxv9GXI3/VnKp/xMmaP91g53/vs7T/0pKVP9QUVj/X2Vw/83k7P/D3eP/xd7l/8Xe5f/F3uX/xN7l/8Xe5f/E3eT/yuPq/5+vuf/B1t7/xuDn/8Xe5f/G3uf/xdrq/8Xd5//F3uX/xd7l/8Xe5f/F3uX/w9zk/87m6v90iKb/UXzG/zZHd/9GXY7/Iy1c/zlKgf9AUoX/PlB9/0hZgv9CU3v/QlN7/0RWfv9FWH//Sl+B/09ggv9JWoD/SVl+/0lZff9MXID/TF6B/01fgv9OYIX/TWCG/05hhv9OYof/TmGH/05ihf9OY4b/T2KG/0pegf9OaZj/HCZI/2CLz/9bic//Ii1f/xwwdv8TLX3/doSb/8HR1f9KSVT/UE9X/15lb//O5e3/xNzj/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xN3k/8zj6v+er7n/vdPb/8fh6P/F3uX/xt7n/8Xa6v/F3ef/xd7l/8Xe5f/F3uX/xd7l/8Pc5P/O5ur/c4mm/1N+yP9BV4//UGaV/yo0Yv85SXv/QVOA/0Vclf9RYpL/jpey/5Kbtf+Rm7T/kpq0/5igtv+fprf/lp2y/5Scsv+UnbP/lp60/5ees/+Yn7P/mJ+0/5iftP+YoLb/mKC2/5aftv+XobX/lqC0/5mluf9+jKH/Wnik/yApTP9gi83/WojP/yg4dv8jNXj/FC18/3WEm//C0db/SUlT/09OV/9dZG3/zeXt/8Pc4//F3uX/xd7l/8Xe5f/F3uX/xd7l/8Td5P/L5ev/na23/7rQ2P/H4ej/xd3l/8fe5//F2ur/xd3n/8Xe5f/F3uX/xd7l/8Xe5f/D3OT/zubq/3KGpf9Wgs3/OlWa/yMwa/86R3P/AwQh/xccO/8TH07/PkNl///+7P////T////y////8/////L////y////8/////L////z////8v////L////z////8v////L////w////8P////H////y////8f////b/+vLo/09ehv8ZIEn/Yo7Q/1mGyv8pQIT/Jjh4/xMpdP90g5v/wM/U/0dHUv9PTlf/XGJr/8zj6v/D3OP/xd7l/8Xe5f/F3uX/xN7l/8Te5f/E3OP/yuTr/5mps/+4zdX/yOLp/8Td5f/H3uf/xdrq/8Xd5//F3uX/xd7l/8Xe5f/F3uX/w9zk/87m6v90hqb/VX/N/z9Znv8aLHL/Lz9+/y03af8aHjv/Fxsz/zQ8W/92eoz/e3+P/3x/j/+AgI//g4KQ/4SDkv+FhJL/h4aT/4mHk/+LhpP/jYiU/42Klv+OjJb/kI2Y/5KPmv+UkZz/lpOd/5aUnf+Wlpz/lJOc/5+do/9dX3T/JzRc/2CL0P9ahsn/KUCF/yo+gv8TK3b/fo6l/8vb4P9JSVT/UlJb/2Jnb//c8ff/xN3l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/wtvi/9Pt9P+is77/tMjS/8rj6v/E3eT/xt7n/8Xa6v/F3ef/xd7l/8Xe5f/F3uX/w9zj/8DZ4f/M5Oj/c4Wl/1SAzf89WJ7/HC5z/yE6hf8uPXj/JixN/x0kRf85QWf/lZSe/5eXo/+TlJ//k5Kf/5KQof+RkKD/j4+e/42Onf+Mjpz/jIuc/4uLnP+Jipr/h4iZ/4WHmf+FiJn/hYeX/4SGlv+DhpX/gYWU/4GEk/9+gJD/jo6a/2RpgP9YhMv/XIfM/yg/hf8oPoX/EiRj/1phb/+fpaj/OzY8/09MUv9MTlb/rLe9/8fc5f/E3ub/xN3k/8Te5f/F3uX/xN3k/8vh6v+0xs//eYOM/7fK1P/L4+z/xd3k/8fd5//F2ur/xd3n/8Xe5f/F3uX/w9zj/9Do8P/S6fL/3PHz/3yOq/9Rf8z/PVqf/xwudP8kQI3/HChk/zc+Y/8dJ1H/SVB5////+f///////////////////////////////////////////////////////////////////////////////v////7////9/////f////z////6//////+np7D/T3vD/1+Jzv8pQIb/HSth/xcdQ/8YJVn/Jzx4/0Rem/8uOmX/GiNL/xMfWv+Jlaf/0+30/8Te5v/H4Oj/xd3n/9Dp8v+errz/GiFB/yk3Xf+Mmqf/0eny/8Pb5P/G3uf/xdvq/8Xd5//F3uX/xN3k/9Dm8P+hrrj/XGJw/0VJXP8/TW3/W4rW/zxZn/8aKGf/FyFP/w8SL/8cHzr/GyE+/zlAZP+LjJT/lZSZ/5qWlP+emJX/oJqW/6Gbl/+jm5n/ppya/6eem/+ooJ3/q6Kf/66lov+xqaX/tKun/7ewqv+5sqz/vrWw/8K4sv/CurX/xLy3/8O7tv/Z0Mb/h4aT/1N/x/9fidD/Kzx3/yMvX/8mNnH/M1Gn/zpguf9Ca8P/LTx2/zBKlP8qTKX/WmJ8/9Hj4//D1Nn/xdba/8LU2P/P4OH/XmqF/xknWP8xQXb/R1F0/8vg5P/G3Of/xt3n/8Xa6v/F3ef/wtvi/9Lr8/97hZT/BwkS/xAZPf8JDS3/Kzdc/1+N2v86VZn/GyZV/xcgT/8UG0H/GB42/xIVK/8yOVH/bnB9/25we/9oaGn/bmpo/25raP9va2r/b2pq/3Brav9saGf/amRk/2VgYf9iXV//Ylxf/2BcXv9dWlv/XFha/1xXWf9bVlf/WlRW/1hSVf9cVlj/Lyk0/yAkQP9gi9L/XIbM/yo3Y/8wQXj/M0N6/zdOjv82U5//QV+j/zJAc/8hMGz/M0+e/zA7Zv9IXY7/Sl+R/0ldj/9MX5D/R1iK/zxRhv8iMWX/IC5Q/09xh/+4ytP/yuLs/8bc5//E2ur/xNvl/8vl7P+sv8v/Exkp/xsqQf84RGr/pqyu/0BNbv9bitj/PViW/zdKf/8dMHX/b3GI/9DOy/++vL3/v769/8vJxf/KycT/yMbC/8fEwP/Ewb3/wb65/7+7tv+/u7X/vbmz/7q2sf+2tK//tbOu/7Wyrv+zsav/sK6p/7Ctqf+tqqf/qqmk/6elov+urKf/iYyQ/x4qVP8jLFz/YYzT/1uFyv8uPGj/O0+J/0RZj/9EXZb/MEiO/0tmpv9AT3z/LkWN/zZUqf9BS3L/b4ey/2uEsv9pg7L/aYS0/2R9rf9bdKb/Ljts/yYxYf88Unj/uczV/8nh6//F3ef/xdrq/8La5P/V7PP/ZG+C/xAePP8pO2H/NENx/2Bqfv9cZ4H/VITT/0Jdm/9feqX/MU+b/8PDyv////////////////////////////////////////////////////////////////////////////////////7////9/////P////v///76///9+f/7+vb////+/56ptP83Uof/Lzx6/2CM0v9ahMj/O057/0FXk/85S4L/Lj5u/yU6fP9NaKr/VmaI/zBIkf8cMYD/e4aU/9rx8v/J3uP/zOHl/8vf4//R5Ob/cIKb/y8+a/85T43/SFWA/8nd4v/G3ej/xt3n/8Xa6f/G3Of/y+Dn/0BJZ/8hNF3/KThp/1Rffv80R33/NUBh/12M2v84UpP/aYCi/y9Gi/9hZ4X/p6Wm/6Ojqv+trbD/t7e5/7u6vP++vb//wcDC/8XExf/Jycn/zc3N/9DQ0P/S0tL/1tXW/9rZ2f/d3Nz/4N/e/+Tj4f/n5eT/6ujn/+3s6v/w7+7/8PDv//36+P+grLj/U22a/yw6df9gjNP/WYPH/z1Qe/89U4z/HilS/z5Siv8vS5v/UG2s/1Vrjf8UGDf/VVtw/7nO1v/H4en/w9zk/8Td5f/C2+P/zOft/5iouf8sOmD/M0Nr/4KRov/R6fH/xNvk/8bd6P/E2un/yd/q/77S2f84RWf/KkBq/yo4av9KVHf/Jzdu/yk5af9ijtj/MUmO/0VYfv8+T3f/DxhT/xQgV/8ULH7/QU11/9LNyP/X0tH/0c3L/9DMyv/Mysb/ycbD/8XDv//Dwb7/wL68/768uv+9urn/vbm3/7u4tv+4t7T/trWy/7Sysv+ysK//sLCu/66urv+xsK//lpqg/01olP8fK1r/YIzR/1mDyv8+UHv/RFmN/yU2Z/8wQXb/MEF2/0Vckf8+UoD/Gh00/8bY3f/N5+7/w9zj/8Xe5f/F3uX/xd7l/8Td5P/L4+r/nq+6/5Skrf/J4uj/xd7m/8Xd5//H3ef/xNrp/8ng6v+80dj/PElp/ylAav9IVYT/p621/xokUP8nNWP/ZI7Y/zZPlP8uPnT/Ok58/xkfSP8YH0L/Ex5F/zg7Tf+WjYH/oJOI/6SVif+rmIz/sJyN/7ehkP+6ppP/vqqX/8Owmv/Isp3/zbWh/9C6pf/Svqn/1sKt/9rIsf/czbb/38+8/+PTwP/l1sT/5tnJ/+3ezv+enaL/RE5t/1yIy/9bhsv/RliF/05ilP8rPHb/LD58/x8pVP8bI0v/KTRs/yQrUP+zxMr/yePq/8Td5P/F3uX/xd7l/8Xe5f/F3uX/xN3k/87o7v/Q6vH/xd7l/8Xe5f/F3ef/xt3o/8Xa6f/H3ef/x93m/1Bbcv8vRm3/MUFw/ycuUv8YIVP/NkNq/2KL2f82TpH/MUWC/zBBgP8pNWv/JC9j/yIrWv8nMV3/LDhi/y04Yv8uOGH/LTdd/y41XP8uNVr/LzdY/zE3Vv8yNlP/NDdS/zY5Uf83O0//OzxP/zw8Tv8+PU3/QT9N/0NCTf9IRE7/S0ZP/0xIT/9RTFT/U0pO/zY4SP9ei9H/XIjM/0JVhv9QZZn/Lj5v/yQvXf8sO3b/MUB1/yo6ef9NVXX/zuLo/8Te5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/D3OP/w9zj/8Xe5f/F3uX/xd3n/8Xd6P/F2+r/xNrk/9Lp8f9zgJH/KDlT/y5Dcv8bJVD/gIyd/3SFov9Vf8//OFGW/y5Bfv87UJT/Q1ik/0Rdp/9HZK3/Smat/0hlqf9JZKj/SGGm/0VepP9EXaP/Q1yi/0Baof89WJz/O1SZ/ztTlf88UJH/Ok6Q/zlMjv82Sor/NEeG/zRGhv8yRYX/LkJ//yw/ev8rPnn/JjZt/yk9dP81S4H/XojM/16L0f83TYP/SFuO/ztPh/8rNmL/KjNV/zM+bf8lM2//aHSR/9Xt8//C2+L/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xd5//F3ej/xtvq/8Tc5f/J4+n/uMvX/yw2Sf8cLFL/V2KB/+7++/93iqr/U3/M/zhTlv8vQn//Ok+Q/0Vcov9JZKr/Wnu//2GDx/9kiMz/ZYnO/2WL0P9mjNL/ZozU/2SO1P9lj9X/ZI7V/2WN0/9ljNL/Y4rR/2OJz/9ih83/YIbK/1+Fyv9eg8v/XYPN/1yCzP9agcr/WXzH/0BfrP84U5z/RV+f/12Gy/9gjdL/OlKI/ys3aP81RHL/IitY/y05Zf8wO2X/GCJe/2t3lP/R6u7/wtvj/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/w97l/8Xe5f/F3uX/xd7l/8Xe5f/F3ef/xd3n/8Xb6v/G3ef/w9zj/87n7v+ktcH/P0ha/yErVP9SVWf/T1x4/12I1P85UpX/LT1v/yY2aP8gKlb/LDhn/0tXe/9GU3j/P050/0VUev9HWYH/RVmE/0Vahv9FW4n/RVuN/0ZdkP9JX5H/S2GU/0tilv9MZZv/S2ac/0xnoP9OaKT/Tmmk/09qpv9Sban/U2+r/05sqv83Upj/NkyM/z1Of/9fiM7/YYzU/zpPgv8hLWT/LTt0/y46cP8zPGH/Lzhb/xYgXv94hqD/0uvw/8Lb4v/F3uX/xd7l/8Xe5f/D3uX/w97l/8Pe5f/F3uX/xd7l/8Xe5f/F3uX/xd3n/8Xd6P/E2ur/xd3n/8Xe5f/D3OP/zeft/8/l7f+Xp7T/eISS/2Bxj/9Zgcr/NUuO/zI9ZP86Rmj/SVVw/x4tX/99hJn/eX6S/wUNQP+HlKL/s8XO/6O0v/+gsLz/nKu4/5eltP+SoLD/jZus/4iVqf+BjqP/fImf/3eEm/90gJb/cHqR/2x1jP9ncIj/YmyF/1xng/9WYoH/S1Nw/0ZYh/9DV4r/YorM/12Kz/9FW4//MTpd/y09ef8zQnf/Pkx9/y4zWP8XIWD/j52x/9Dq7//C2+P/xd7l/8Xe5f/F3uX/w97l/8Pe5f/F3uX/xd7l/8Xe5f/F3uX/xd7m/8Xd5//F3uf/xdrq/8Xd5//F3uX/xd7l/8Pc4//E3eT/zObt/9/4+/98kKr/T3a7/y1Agv8bKFr/h5Oj/258mf98iaD/R1Fz/yovTP8fKVz/tsjQ/9Tt9P/M5uz/zuju/87p7//P6vD/0Orw/9Hr8P/R6/H/0urw/9Pr8P/S6/D/0urv/9Hp7v/Q6O3/z+fs/8/l6//O5er/zeTq/8/g5P9keaf/FCVc/0tspv9kkNT/Ok6D/yMsVf8rN2X/LDtq/zVGff8hJkr/ICtm/6e3xf/M5u3/w9zj/8Xe5f/F3uX/w97l/8Pe5f/E3uX/xd7l/8Xe5f/E3uX/xN7l/8Xe5v/F3ef/xd3o/8Xa6v/F3ef/xd7l/8Xe5f/F3uX/xd7l/8HZ4f/N5uz/jJ6u/1R4t/80SpH/Hyhb/8XQ0P9ebYv/wtDZ/4OOnP8EDD//P0lw/8fd4f/D3OT/w9zj/8Pc4//D3OP/w9zj/8Pb4//D2+P/wtvj/8Lb4//C2+P/wtvj/8Pc4//D3OP/w9zj/8Pc5P/E3eT/xd7l/8Td5P/K4ur/g5Sq/256kv9Zcpn/YIjK/ztUjv8uOGX/V112/0lVff9MWXr/ERlG/zZDd/+/09v/yOHo/8Td5P/F3uX/xd7l/8Pe5f/D3uX/w97l/8Pe5f/D3uX/w97l/8Xe5f/F3uX/xd3n/8Xc6f/F2ur/xd3m/8Xe5f/F3uX/xd7l/8Xe5f/E3eT/yeTr/7PGzv9cean/RF+j/xolZ/90fpT/aHSJ/3+Hlf86Q2v/ER1a/3N/kv/T7PH/wtvi/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8vj6v/a8PX/d4um/1l+u/9IY6P/Rk1x/5CWpP9aaI3/cneE/xEfZv9bZ4v/0Obt/8Pc5P/F3uX/xd7l/8Pe5f/E3uX/w97l/8Pe5f/D3uX/w97l/8Pe5f/E3uX/xd7l/8Xd5//F3ej/xdvq/8Xd5v/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Pc4//O5uz/fpCn/0prrP8rOXn/Hi9w/yYyW/8cJVD/FSJf/yQsVP+7zdT/yePq/8Td5P/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/B2uL/y+Tr/6Cwvv9ScaH/XHy3/z5Nff9naXj/JCxG/y86bf8aKGj/kaCv/9Hp8v/D2+P/xd7l/8Xe5f/D3uX/xd7l/8Te5f/D3uX/w97l/8Pe5f/D3uX/w97l/8Xe5f/F3ef/xd3n/8Xa6v/F3ef/xd7l/8Pe5f/D3uX/w97l/8Xe5f/E3eT/x+Ho/7/T2/9ieJ7/PE+F/xkiWv8WJmf/FyVi/yMrUf+Wo67/zufu/8DZ4f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Te5f/D3uX/w97l/8Xe5f/F3uX/xd7l/8Xe5f/E3uX/xN7l/8Te5f/E3uX/xd7l/8Xe5f/F3uX/xd7l/8Td5P/M4+r/eImf/1Jtov86T4n/Ex1O/xQbS/8QG1j/R09u/8vg6P/F3eX/xd7l/8Xe5f/E3uX/w97l/8Xe5f/F3uX/xd7l/8Pe5f/D3uX/w97l/8Pe5f/F3uX/xd3n/8Xd5//F2ur/xd3n/8Xe5f/D3uX/w97l/8Pe5f/E3uX/xd7l/8Lb4v/S7PL/kqKt/z5Vhf9DTXT/l6Gq/7G/x//G2OD/2fD3/8/n7f/Q6e7/xt/m/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xN7l/8Te5f/E3uX/xd7l/8Xe5f/F3uX/xN7l/8Xe5f/E3uX/xN7l/8Xe5f/F3uX/xd7l/8Xe5f/F3eT/xuDn/8bd5P+ClKn/XGuM/zxHbv8rOWj/Ult1/7vO1//J4+r/xN3k/8Xe5f/F3uX/xd7l/8Te5f/E3uX/xd7l/8Te5f/D3uX/w97l/8Pe5f/D3uX/xd7l/8Xd5//F3ej/xdvp/8Xd5//F3uX/w97l/8Pe5f/D3uX/w97l/8Te5f/E3eT/yuTr/6/Dzf84TX//bXyY/5+quf9rdYv/prfE/6O2xv+Yqbz/nK2+/8Tc5f/G3+b/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xN7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Td5P/G3+b/zebs/8rg5f/E2N3/v9PX/9Dn7P/J4un/w93k/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Te5f/D3uX/w97l/8Pe5f/D3uX/xd7l/8Xe5f/F3ef/xd3o/8Xb6f/F3ef/xd7l/8Xe5f/E3uX/w97l/8Pe5f/D3uX/xN3k/8rk6/+vw8v/SWWb/z9QeP8hNXL/HjR5/zlBZv9JWYL/R1iB/05cff+4zNb/yeLq/8Td5P/E3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xN7l/8Pe5f/E3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Pc5P/E3uX/xuDn/8jh6f/D3OT/xN3k/8Xe5f/F3uX/xd7l/8Xe5v/F3uX/xd7l/8Xe5f/E3uX/xN7l/8Te5f/D3uX/xN7l/8Xe5f/F3uX/xd3n/8Xd6P/F2+j/xd3n/8Xe5f/F3uX/xd7l/8Xe5f/E3uX/xd7l/8Xe5f/G4Of/w9nh/26Dnf+Qn7L/lqa5/4iZrf/D1t//wNbc/8Ta3//H3eP/yODn/8Xe5f/G3+b/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/E3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xd5f/E3eT/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/G3+b/xd7l/8Xe5f/F3uX/xN7l/8Te5f/F3uX/xN7l/8Xe5f/F3uX/xd7l/8Xd5//F3ej/xdvp/8Xd5//F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7k/8fg5//K4eb/zuXs/8/o7f/P5+z/yeHo/8jh6P/I4ej/x+Dn/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xt/l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3uX/xd7l/8Xe5f/F3ef/xd3o/8Xc6P/F3ef/xd7m/8Xe5v/F3uf/xd7m/8Xe5v/F3ub/xd7m/8Xe5v/F3ub/xN3m/8Td5f/D3OX/w9zk/8Td5f/F3ef/xd7n/8be5v/F3ub/xd7m/8Xe5//F3ub/xd7m/8Xe5//F3ub/xd7m/8Xe5//F3ub/xd7n/8Xe5v/F3ub/xd7n/8Xe5v/F3ub/xd7n/8Xe5//F3ub/xd7n/8Xe5//F3uf/xd7m/8Xe5//F3uf/xd7m/8Xe5//F3uf/xd7m/8Xe5v/F3uf/xd7n/8be5//F3uf/xd7m/8Xe5v/F3uf/xd7n/8Xe5//F3uf/xd7n/8Xe5//F3ub/xd3m/8bd6v/F3Of/xt3n/8bd5v/G3ub/x97n/8fe5v/H3ub/x97o/8fe5//H3uj/xt/n/8bf5v/G3uf/xt7n/8fe5//H3+b/x97m/8fe5//G3uf/xt7n/8be6P/G3uf/xt7n/8be5v/G3uf/x97m/8fe5v/H3+b/xt7m/8fe5//H3+f/x9/m/8bf5v/G3ub/x9/m/8fe5v/H3uf/xt7n/8be5v/G3uj/xt/n/8bf5v/H3+f/x9/n/8fe5//G3+f/xt/m/8be5v/H3ub/xt7m/8be5//G3uf/xt7n/8bf5//G3+f/x97o/8bf5//G3uf/xt7n/8be5//G3uf/xt7n/8bd6P/G3un/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
// @supportURL         https://github.com/MapoMagpie/eh-view-enhance/issues
// @downloadURL        https://github.com/MapoMagpie/comic-looms/releases/latest/download/comic-looms.user.js
// @updateURL          https://github.com/MapoMagpie/comic-looms/releases/latest/download/comic-looms.meta.js
// @match              *://*/*
// @require            https://cdn.jsdelivr.net/npm/@zip.js/zip.js@2.7.57/dist/zip-full.min.js
// @require            https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @require            https://cdn.jsdelivr.net/npm/pica@9.0.1/dist/pica.min.js
// @connect            *
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// ==/UserScript==

(function (fileSaver, pica, zip_js) {
  'use strict';

  var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const zip_js__namespace = /*#__PURE__*/_interopNamespaceDefault(zip_js);

  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();

  const getI18nIndex = (lang2) => {
    if (lang2.startsWith("zh")) return 1;
    if (lang2.startsWith("ko")) return 2;
    if (lang2.startsWith("es")) return 3;
    return 0;
  };
  const lang = navigator.language;
  const i18nIndex = getI18nIndex(lang);
  class I18nValue extends Array {
    constructor(langs) {
      super(...langs);
    }
    get() {
      return this[i18nIndex];
    }
  }
  const i18nData = {
    // page-helper
    imageScale: [
      "SCALE",
      "缩放",
      "배율",
      "Escala"
    ],
    config: [
      "CONF",
      "配置",
      "설정",
      "Ajustes"
    ],
    chapters: [
      "CHAPTERS",
      "章节",
      "챕터",
      "Capítulos"
    ],
    filter: [
      "FILTER",
      "过滤",
      "FILTER",
      "FILTER"
    ],
    autoPagePlay: [
      "PLAY",
      "播放",
      "재생",
      "Reproducir"
    ],
    autoPagePause: [
      "PAUSE",
      "暂停",
      "일시 중지",
      "Pausar"
    ],
    collapse: [
      "FOLD",
      "收起",
      "접기",
      "Plegar"
    ],
    // config panel number option
    colCount: [
      "Columns",
      "每行数量",
      "열 수",
      "Columnas"
    ],
    colCountTooltip: [
      "The number of images per row in the thumbnail list. If the layout is Flow Vision, the final number of images per row will be influenced by the specific aspect ratio of the images.",
      "缩略图列表的每行图片数量。如果布局为自适应视图，最终每行图片数量受图片的具体宽高比影响。",
      "썸네일 목록에서 한 줄에 표시되는 이미지의 개수입니다. 레이아웃이 반응형인 경우, 최종 한 줄에 표시되는 이미지의 개수는 이미지의 구체적인 가로세로 비율에 영향을 받습니다.",
      "El número de imágenes por fila en la lista de miniaturas. Si el diseño es adaptable, el número final de imágenes por fila estará influenciado por la proporción de aspecto específica de las imágenes."
    ],
    rowHeight: [
      "Row Height",
      "每行高度",
      "행 높이",
      "Altura de fila"
    ],
    rowHeightTooltip: [
      "This option is only effective when the layout of the thumbnail list is Flow Vision. The reference height per row, along with the number of images per row, jointly influences the final display effect.",
      "此项仅在缩略图列表的布局为自适应视图时有效。每行的参考高度，和每行数量共同影响最终的展示效果。",
      "이 옵션은 썸네일 목록의 레이아웃이 반응형일 때만 유효합니다. 각 행의 기준 높이는 행당 이미지 개수와 함께 최종 표시 결과에 영향을 미칩니다.",
      "Esta opción solo es efectiva cuando el diseño de la lista de miniaturas es adaptable. La altura de referencia por fila, junto con el número de imágenes por fila, influye en el efecto final de la visualización."
    ],
    threads: [
      "Preload Threads",
      "最大同时加载",
      "동시 로드 수",
      "Hilos de pre-carga"
    ],
    threadsTooltip: [
      "Max Preload Threads",
      "大图浏览时，每次滚动到下一张时，预加载的图片数量，大于1时体现为越看加载的图片越多，将提升浏览体验。",
      "큰 이미지 모드에서 다음 이미지로 이동할 때 미리 로드할 이미지 수입니다.<br>이 값이 1보다 클 경우, 동시에 로드되는 이미지가 더 많아져서 사용 경험이 향상됩니다.",
      "Hilos máximos de pre-carga"
    ],
    downloadThreads: [
      "Download Threads",
      "最大同时下载",
      "최대 동시 다운로드",
      "Hilos de descarga"
    ],
    downloadThreadsTooltip: [
      "Max Download Threads, suggest: <5",
      "下载模式下，同时加载的图片数量，建议小于等于5",
      "다운로드 모드에서 동시에 다운로드할 이미지 수입니다. 5 이하로 설정하는 것이 좋습니다.",
      "Hilos máximos de descarga, sugerido: <5"
    ],
    paginationIMGCount: [
      "Images Per Page",
      "每页图片数量",
      "페이지당 이미지 수",
      "Imágenes por página"
    ],
    paginationIMGCountTooltip: [
      "In Pagination Read mode, the number of images displayed on each page",
      "当阅读模式为翻页模式时，每页展示的图片数量",
      "페이지 넘김 모드에서 각 페이지에 표시될 이미지 수입니다.",
      "En el modo de lectura por paginación, el número de imágenes mostradas en cada página"
    ],
    timeout: [
      "Timeout(second)",
      "超时时间(秒)",
      "이미지 로딩 시도 시간 (초)",
      "Tiempo de espera (segundos)"
    ],
    preventScrollPageTime: [
      "Min Paging Time",
      "最小翻页时间",
      "최소 페이지 넘김 시간",
      "Tiempo mínimo de paginación"
    ],
    preventScrollPageTimeTooltip: [
      "In Pagination read mode, prevent immediate page flipping when scrolling to the bottom/top to improve the reading experience.<br>Set to 0 to disable this feature,<br>If set to less than 0, page-flipping via scrolling is always disabled, except for the spacebar.<br>measured in milliseconds.",
      "当阅读模式为翻页模式时，滚动浏览时，阻止滚动到底部时立即翻页，提升阅读体验。<br>设置为0时则禁用此功能，单位为毫秒。<br>设置小于0时则永远禁止通过滚动的方式翻页。空格键除外。",
      "페이지 넘김 모드에서 아래/위로 스크롤 시 너무 빨리 페이지가 넘어가는 것을 방지하여 읽기 경험을 개선합니다.<br>0으로 설정하면 이 기능이 비활성화됩니다.<br>0보다 작은 값으로 설정하면 단축키를 제외하고 스크롤을 통한 페이지 넘김이 항상 비활성화됩니다. (밀리초 단위)",
      "En el modo de lectura por paginación, evita el cambio inmediato de página al desplazarse hacia el fondo o la parte superior para mejorar la experiencia de lectura.<br>Establezca en 0 para desactivar esta función,<br>Si se establece en menos de 0, el cambio de página mediante desplazamiento siempre está desactivado, excepto para la barra espaciadora.<br>Medido en milisegundos."
    ],
    autoPageSpeed: [
      "Auto Paging Speed",
      "自动翻页速度",
      "자동 페이지 넘김 속도",
      "Velocidad de paginación automática"
    ],
    autoPageSpeedTooltip: [
      "In Pagination read mode, Auto Page Speed means how many seconds it takes to flip the page automatically.<br>In Continuous read mode, Auto Page Speed means the scrolling speed.",
      "当阅读模式为翻页模式时，自动翻页速度表示为多少秒后翻页。<br>当阅读模式为连续模式时，自动翻页速度表示为滚动速度。",
      "페이지 넘김 모드에서 자동 페이지 넘김 속도는 몇 초 후에 자동으로 페이지가 넘어갈지를 의미합니다.<br>연속 읽기 모드에서 자동 페이지 넘김 속도는 자동 스크롤 속도를 의미합니다.",
      "En el modo de lectura por paginación, la velocidad de página automática indica cuántos segundos toma cambiar la página automáticamente.<br>En el modo de lectura continua, la velocidad de página automática indica la velocidad de desplazamiento."
    ],
    scrollingDelta: [
      "Scrolling Delta",
      "滚动距离",
      "Scrolling Delta",
      "Scrolling Delta"
    ],
    scrollingDeltaTooltip: [
      "During non-native scrolling (custom keyboard scrolling, horizontal scrolling), the distance of each scroll.",
      "非浏览器原生的滚动时（按键滚动、横向滚动），每次滚动的距离。",
      "비기본 스크롤(사용자 정의 키보드 스크롤, 가로 스크롤) 중 각 스크롤의 거리입니다.",
      "Durante el desplazamiento no nativo (desplazamiento con teclado personalizado, desplazamiento horizontal), la distancia de cada desplazamiento."
    ],
    scrollingSpeed: [
      "Scrolling Speed",
      "滚动速度",
      "스크롤 속도",
      "Velocidad de desplazamiento"
    ],
    scrollingSpeedTooltip: [
      "During non-native scrolling (custom keyboard scrolling, horizontal scrolling), the speed of scrolling.",
      "非浏览器原生的滚动时（按键滚动、横向滚动），滚动的速度。",
      "비기본 스크롤(사용자 정의 키보드 스크롤, 가로 스크롤) 중 스크롤 속도입니다.",
      "Durante el desplazamiento no nativo (desplazamiento con teclado personalizado, desplazamiento horizontal), la velocidad de desplazamiento."
    ],
    // config panel boolean option
    fetchOriginal: [
      "Raw Image",
      "最佳质量",
      "원본 이미지",
      "Imagen sin procesar"
    ],
    fetchOriginalTooltip: [
      "enable will download the original source, cost more traffic and quotas",
      "启用后，将加载未经过压缩的原档文件，下载打包后的体积也与画廊所标体积一致。<br>注意：这将消耗更多的流量与配额，请酌情启用。",
      "활성화하면 원본 파일이 다운로드됩니다. 더 많은 트래픽과 할당량이 소비됩니다.",
      "Activar descargará la fuente original, lo que consumirá más tráfico y cuotas"
    ],
    autoLoad: [
      "Auto Load",
      "自动加载",
      "자동 로드",
      "Carga automática"
    ],
    autoLoadTooltip: [
      "Automatically start loading images after entering this script's view",
      "进入本脚本的浏览模式后，即使不浏览也会一张接一张的加载图片。直至所有图片加载完毕。",
      "보기 모드에 진입하면, 사용자가 탐색 중이 아닐 때도 이미지가 하나씩 자동으로 로드됩니다. 모든 이미지가 로드될 때까지 계속됩니다.",
      "Comience a cargar imágenes automáticamente después de ingresar a la vista de este script."
    ],
    reversePages: [
      "Reverse Pages",
      "反向翻页",
      "페이지 순서 뒤집기",
      "Revertir páginas"
    ],
    reversePagesTooltip: [
      "Clicking on the side navigation, if enable then reverse paging, which is a reading style similar to Japanese manga where pages are read from right to left.",
      "点击侧边导航时，是否反向翻页，反向翻页类似日本漫画那样的从右到左的阅读方式。",
      "측면 내비게이션을 클릭했을 때 이미지들을 거꾸로 배치할 지 선택합니다. 일본 만화처럼 오른쪽에서 왼쪽으로 읽는 스타일의 이미지에 적용하면 좋습니다.",
      "Hacer clic en la navegación lateral, si está habilitado, revertirá la paginación, que es un estilo de lectura similar al manga japonés, donde las páginas se leen de derecha a izquierda."
    ],
    autoPlay: [
      "Auto Page",
      "自动翻页",
      "자동 페이지 넘김",
      "Paginación automática"
    ],
    autoPlayTooltip: [
      "Auto Page when entering the big image readmode.",
      "当阅读大图时，开启自动播放模式。",
      "이미지 크게 보기 모드에 들어가면 바로 자동 페이지 넘김을 활성화합니다.",
      "Paginación automática al entrar en el modo de lectura de imagen grande."
    ],
    autoLoadInBackground: [
      "Keep Loading",
      "后台加载",
      "백그라운드 로딩",
      "Sigue cargando"
    ],
    autoLoadInBackgroundTooltip: [
      "Keep Auto-Loading after the tab loses focus",
      "当标签页失去焦点后保持自动加载。",
      "사용자가 다른 창을 볼 때도 자동 로딩을 계속합니다.",
      "Mantener la carga automática después de que la pestaña pierda el enfoque"
    ],
    autoOpen: [
      "Auto Open",
      "自动展开",
      "자동 이미지 열기",
      "Abrir automáticamente"
    ],
    autoOpenTooltip: [
      "Automatically open after the gallery page is loaded",
      "进入画廊页面后，自动展开阅读视图。",
      "갤러리 페이지가 로드된 후 첫 페이지를 자동으로 엽니다.",
      "Abrir automáticamente después de que la página de la galería se cargue"
    ],
    autoCollapsePanel: [
      "Auto Fold Control Panel",
      "自动收起控制面板",
      "설정 창 자동으로 닫기",
      "Plegar automáticamente el panel de control"
    ],
    autoCollapsePanelTooltip: [
      "When the mouse is moved out of the control panel, the control panel will automatically fold. If disabled, the display of the control panel can only be toggled through the button on the control bar.",
      "当鼠标移出控制面板时，自动收起控制面板。禁用此选项后，只能通过控制栏上的按钮切换控制面板的显示。",
      "마우스가 설정 창이나 컨트롤 바를 벗어나면 설정 창이 자동으로 닫힙니다. 비활성화된 경우, 컨트롤 바의 버튼을 통해서만 창을 여닫을 수 있습니다.",
      "Cuando el mouse se mueve fuera del panel de control, este se plegará automáticamente. Si está desactivado, la visualización del panel de control solo se puede alternar mediante el botón en la barra de control."
    ],
    magnifier: [
      "Magnifier",
      "放大镜",
      "돋보기",
      "Lupa"
    ],
    magnifierTooltip: [
      "In the pagination reading mode, you can temporarily zoom in on an image by dragging it with the mouse click, and the image will follow the movement of the cursor.",
      "在翻页阅读模式下，你可以通过鼠标左键拖动图片临时放大图片以及图片跟随指针移动。",
      "Pagination 읽기 모드에서 마우스 클릭으로 이미지를 드래그하면 일시적으로 이미지를 확대할 수 있으며, 이미지가 마우스 커서의 움직임을 따라 이동합니다.",
      "En el modo de lectura por paginación, puedes hacer un zoom temporal en una imagen arrastrándola con el clic del mouse, y la imagen seguirá el movimiento del cursor."
    ],
    autoEnterBig: [
      "Auto Big",
      "自动大图",
      "이미지 바로 보기",
      "Auto Grande"
    ],
    dragImageOut: [
      "Drag Image Out",
      "拖拽图片到外部",
      "이미지를 밖으로 드래그",
      "Arrastrar imagen hacia afuera"
    ],
    dragImageOutTooltip: [
      `Enabling this option will restore the browser's default dragging behavior for images (saving the image to the directory where it was dragged), 
but will disable the magnifier and the ability to drag and move images.`,
      `启用此项将恢复浏览器默认对图片的拖拽行为(保存图片到所拖拽到的目录)，但会禁用放大镜功能以及拖拽移动图片位置的功能。`,
      `이 옵션을 활성화하면 이미지에 대한 브라우저의 기본 드래그 동작(이미지를 드래그한 디렉토리에 이미지 저장)이 복원됩니다. 
하지만 돋보기와 이미지 드래그 및 이동 기능은 비활성화됩니다.`,
      `Habilitar esta opción restaurará el comportamiento de arrastre predeterminado del navegador para imágenes (guardando la imagen en el directorio donde fue arrastrada). 
pero desactivará la lupa y la capacidad de arrastrar y mover imágenes.`
    ],
    autoEnterBigTooltip: [
      "Directly enter the Big image view when the script's entry is clicked or auto-opened",
      "点击脚本入口或自动打开脚本后直接进入大图阅读视图。",
      "이미지 뷰어가 열리면 즉시 큰 이미지 보기 모드로 전환됩니다.",
      "Entrar directamente en la vista de imagen grande cuando se haga clic en la entrada del script o se abra automáticamente"
    ],
    hdThumbnails: [
      "HD Thumbnails",
      "高清缩略图",
      "HD 썸네일",
      "Miniaturas HD"
    ],
    hdThumbnailsTooltip: [
      "When the large image is loaded, whether to resample a clearer image from the large image as a thumbnail, will affect performance.",
      "当图片加载完毕后，是否从源图重新采样更加清晰的图片作为缩略图，此项会影响性能。",
      "큰 이미지가 로드될 때 큰 이미지에서 보다 선명한 이미지를 썸네일로 리샘플링할지 여부가 성능에 영향을 미칩니다.",
      "Cuando se carga la imagen grande, el hecho de volver a muestrear una imagen más clara de la imagen grande como miniatura afectará el rendimiento."
    ],
    pixivJustCurrPage: [
      "Pixiv Only Load Current Page",
      "Pixiv仅加载当前作品页",
      "Pixiv 현재 페이지만 로드",
      "Pixiv: Cargar solo la página actual"
    ],
    pixivAscendWorks: [
      "Pixiv Ascending Works",
      "Pixiv升序排列作品",
      "Pixiv 오름차순 작품",
      "Obras Ascendentes Pixiv"
    ],
    pixivAscendWorksTooltip: [
      "Sort the artist's works in ascending order, from oldest to newest. (need refresh)",
      "将画师的作品以升序方式排序，从旧到新。(需要刷新)",
      "아티스트의 작품을 오름차순으로 정렬합니다. 오래된 것부터 최신 순으로. (need refresh)",
      "Ordena las obras del artista en orden ascendente, de las más antiguas a las más recientes. (need refresh)"
    ],
    pixivJustCurrPageTooltip: [
      `In Pixiv, if the current page is on a artwork page, only load the images from current page. Disable this option or the current page is on the artist's homepage, all images by that author will be loaded. <br>Note: You can continue loading all the remaining images by the author by scrolling on the page or pressing "Try Fetch Next Page" key after disabling this option.`,
      "在Pixiv中，如果当前页是作品页则只加载当前页中的图片，如果该选项禁用或者当前页是作者主页，则加载该作者所有的作品。<br>注：你可以禁用该选项后，然后通过页面滚动或按下Shift+n来继续加载该作者所有的图片。",
      'Pixiv에서 현재 페이지가 작품 페이지일 경우, 해당 페이지의 이미지들만 로드합니다. 이 옵션을 비활성화하거나 현재 페이지가 작가의 홈 페이지일 경우, 해당 작가의 모든 이미지를 로드합니다. <br>참고: 이 옵션을 비활성화한 후, 페이지를 스크롤하거나 "다음 페이지 로딩 재시도" 키를 눌러 작가의 나머지 이미지를 계속 로드할 수 있습니다.',
      'En Pixiv, si la página actual está en una página de una obra, solo se cargarán las imágenes de la página actual. Desactive esta opción si la página actual está en la página de inicio del artista; en ese caso, se cargarán todas las imágenes de ese autor. <br>Nota: Puedes continuar cargando todas las imágenes restantes del autor desplazándote por la página o presionando la tecla "Intentar cargar la siguiente página" después de desactivar esta opción.'
    ],
    // config panel select option
    readMode: [
      "Read Mode",
      "阅读模式",
      "읽기 모드",
      "Modo de lectura"
    ],
    readModeTooltip: [
      "Switch to the next picture when scrolling, otherwise read continuously",
      "滚动时切换到下一张图片，否则连续阅读",
      "스크롤 시 다음 이미지로 전환하거나, 이미지들을 연속으로 배치합니다.",
      "Cambiar a la siguiente imagen al desplazarse, de lo contrario, leer de manera continua"
    ],
    stickyMouse: [
      "Sticky Mouse",
      "黏糊糊鼠标",
      "마우스 고정",
      "Mouse adhesivo"
    ],
    stickyMouseTooltip: [
      "In pagination reading mode, scroll a single image automatically by moving the mouse.",
      "非连续阅读模式下，通过鼠标移动来自动滚动单张图片。",
      "페이지 읽기 모드에서 마우스 커서를 움직여 하나의 이미지를 자동으로 스크롤합니다.",
      "En el modo de lectura por paginación, desplaza una sola imagen automáticamente moviendo el mouse."
    ],
    minifyPageHelper: [
      "Minify Control Bar",
      "最小化控制栏",
      "컨트롤 바 최소화",
      "Minimizar barra de control"
    ],
    minifyPageHelperTooltip: [
      "Minify Control Bar",
      "最小化控制栏",
      "언제 컨트롤 바를 최소화할지 선택합니다.",
      "Minimizar barra de control"
    ],
    hitomiFormat: [
      "Hitomi Image Format",
      "Hitomi 图片格式",
      "Hitomi 이미지 형식",
      "Formato de imagen de Hitomi"
    ],
    hitomiFormatTooltip: [
      "In Hitomi, Fetch images by the format.<br>if Auto then try Avif > Jxl > Webp, Requires Refresh",
      "在Hitomi中的源图格式。<br>如果是Auto，则优先获取Avif > Jxl > Webp，修改后需要刷新生效。",
      "Hitomi에서 이미지를 어떤 종류의 파일로 가져올 지 선택합니다.<br>Auto 설정 시 Avif > Jxl > Webp 순으로 시도하며, 변경 후 새로고침이 필요합니다.",
      "En Hitomi, obtener imágenes por formato.<br>Si está en automático, intentará Avif > Jxl > Webp. Requiere actualización."
    ],
    ehentaiTitlePrefer: [
      "Title Language Prefer",
      "标题语言偏好",
      "제목 언어 선호",
      "Idioma del título preferido"
    ],
    ehentaiTitlePreferTooltip: [
      "Many galleries have both an English/Romanized title and a title in Japanese script. <br>Which one do you want to use as the archive filename?",
      "许多图库都同时拥有英文/罗马音标题和日文标题，<br>您希望下载时哪个作为文件名？",
      "많은 갤러리가 영어/로마자 제목과 일본어 제목을 모두 가지고 있습니다. <br>어떤 것을 아카이브 파일 이름으로 사용할지 선택할 수 있습니다.",
      "Muchas galerías tienen tanto un título en inglés/romanizado como un título en script japonés.<br>¿Cuál quieres usar como nombre de archivo?"
    ],
    reverseMultipleImagesPost: [
      "Descending Images In Post",
      "反转推文图片顺序",
      "포스트 이미지 내림차순 정렬",
      "Imágenes descendentes en la publicación"
    ],
    reverseMultipleImagesPostTooltip: [
      "Reverse order for post with multiple images attatched",
      "反转推文图片顺序",
      "여러 이미지가 첨부된 포스트 내 이미지들의 순서를 역순으로 정렬합니다.",
      "Orden inverso para publicaciones con múltiples imágenes adjuntas"
    ],
    excludeVideo: [
      "Exclude Videos",
      "排除视频",
      "비디오 제외",
      "Excluir videos"
    ],
    excludeVideoTooltip: [
      "Exclude videos, now only applies to x.com and kemono.su.",
      "排除视频，现在仅作用于x.com和kemono.su",
      "비디오 제외, 현재 x.com과 kemono.su에만 적용됩니다.",
      "Excluir videos, ahora solo se aplica a x.com y kemono.su."
    ],
    filenameOrder: [
      "Filename Order",
      "文件名排序",
      "파일명 순서",
      "Orden de nombres de archivo"
    ],
    filenameOrderTooltip: [
      `Filename Sorting Rules for Downloaded Files:
<br>  Auto: Detect whether the original filenames are consistent with the reading order under natural sorting (Windows). If consistent, keep the original filenames; otherwise, prepend a number to the original filenames to ensure the correct order.
<br>  Numbers: Ignore the original filenames and rename the files directly according to the reading order.
<br>  Original: Keep only the original filenames without ensuring the reading order, which may result in overwriting files with the same name.
<br>  Alphabetically: Detect whether the original filenames are consistent with the reading order under alphabetical sorting (Linux). If consistent, keep the original filenames; otherwise, prepend a number to the original filenames to ensure the correct order. `,
      `下载文件内的文件名排序规则：
<br>  Auto: 检测原文件名在自然排序(Windows)下是否与阅读顺序一致，如果一致保留原文件名，否则将在原文件名前添加序号以保证顺序。
<br>  Numbers: 忽略原文件名，直接以阅读顺序为文件命名。
<br>  Original: 只保留原文件名，不能保证阅读顺序以及同名文件覆盖。
<br>  Alphabetically: 检测原文件名在字母排序下(Linux)是否与阅读顺序一致，如果一致保留原文件名，否则将在原文件名前添加序号以保证顺序。`,
      `다운로드 파일의 파일명 정렬 규칙:
<br>  Auto: 원본 파일명이 기본 정렬(Windows)에서 읽기 순서와 일치하는지 감지합니다. 일치하는 경우 원본 파일명을 유지하고, 그렇지 않으면 순서를 보장하기 위해 파일명 앞에 번호를 추가합니다.
<br>  Numbers: 원본 파일명을 무시하고 읽기 순서에 따라 파일명을 직접 지정합니다.
<br>  Original: 원본 파일명만 유지하며, 읽기 순서가 보장되지 않으며 동일한 이름의 파일이 덮어쓰일 수 있습니다.
<br>  Alphabetically: 원본 파일명이 알파벳 정렬(Linux)에서 읽기 순서와 일치하는지 감지합니다. 일치하는 경우 원본 파일명을 유지하고, 그렇지 않으면 순서를 보장하기 위해 파일명 앞에 번호를 추가합니다. `,
      `Reglas de ordenamiento de nombres de archivos para archivos descargados:
<br>  Auto: Detecta si los nombres de archivo originales son consistentes con el orden de lectura bajo el ordenamiento natural (Windows). Si son consistentes, conserva los nombres de archivo originales; de lo contrario, antepone un número a los nombres originales para garantizar el orden correcto.
<br>  Numbers: Ignora los nombres de archivo originales y renombra los archivos directamente según el orden de lectura.
<br>  Original: Conserva únicamente los nombres de archivo originales sin garantizar el orden de lectura, lo que puede resultar en sobrescribir archivos con el mismo nombre.
<br>  Alphabetically: Detecta si los nombres de archivo originales son consistentes con el orden de lectura bajo el orden alfabético (Linux). Si son consistentes, conserva los nombres de archivo originales; de lo contrario, antepone un número a los nombres originales para garantizar el orden correcto. `
    ],
    dragToMove: [
      "Drag to Move the control bar",
      "拖动移动",
      "드래그해서 컨트롤 바 이동",
      "Arrastra para mover la barra de control"
    ],
    resetDownloaded: [
      "Reset Downloaded Images",
      "重置已下载的图片",
      "다운로드한 이미지 초기화",
      "Restablecer imágenes descargadas"
    ],
    resetDownloadedConfirm: [
      "You will reset Downloaded Images!",
      "已下载的图片将会被重置为未下载！",
      "이미지들은 다운로드하지 않은 상태로 초기화됩니다!",
      "¡Vas a restablecer las imágenes descargadas!"
    ],
    resetFailed: [
      "Reset Failed Images",
      "重置下载错误的图片",
      "로딩 실패한 이미지 초기화",
      "Restablecer imágenes fallidas"
    ],
    showHelp: [
      "Help",
      "帮助",
      "도움말",
      "Ayuda"
    ],
    showKeyboard: [
      "Keyboard",
      "快捷键",
      "단축키",
      "Teclado"
    ],
    showSiteProfiles: [
      "Site Profiles",
      "站点配置",
      "사이트 설정",
      "Perfiles del sitio"
    ],
    showStyleCustom: [
      "Style",
      "样式",
      "스타일",
      "Estilo"
    ],
    showActionCustom: [
      "Image Actions",
      "图片操作",
      "이미지 작업",
      "Acciones de imagen"
    ],
    example: [
      "Example",
      "示例",
      "예시",
      "Ejemplo"
    ],
    description: [
      "Description",
      "描述",
      "설명",
      "Descripción"
    ],
    function: [
      "Function",
      "函数",
      "함수",
      "Función"
    ],
    parameters: [
      "Parameters",
      "参数",
      "매개변수",
      "Parámetros"
    ],
    body: [
      "Body",
      "体",
      "본문",
      "Cuerpo"
    ],
    icon: [
      "ICON",
      "图标",
      "아이콘",
      "ICONO"
    ],
    optional: [
      "Optional",
      "可选",
      "선택적",
      "Opcional"
    ],
    regexp: [
      "Regexp",
      "正则",
      "정규식",
      "Regexp"
    ],
    workon: [
      "Work On Sites",
      "生效站点",
      "사이트에서 작동",
      "Funciona en sitios"
    ],
    controlBarStyleTooltip: [
      "Click on an item to modify its display text, such as emoji or personalized text. Changes will take effect after restarting.",
      "点击某项后修改其显示文本，比如emoji或个性文字，也许svg，重启后生效。",
      "아이템을 클릭하여 이모티콘이나 텍스트 등을 수정할 수 있습니다. 변경 사항은 재시작 후 적용됩니다.",
      "Haga clic en un elemento para modificar el texto que se muestra, como emoji o texto personalizado. Los cambios entrarán en vigor después de reiniciar."
    ],
    resetConfig: [
      "Reset Config",
      "重置配置",
      "구성 재설정",
      "Restablecer configuración"
    ],
    letUsStar: [
      "Let's Star",
      "点星",
      "별 눌러줘",
      "Presiona la estrella"
    ],
    // download panel
    download: [
      "DL",
      "下载",
      "다운로드",
      "Descargar"
    ],
    forceDownload: [
      "Take Loaded",
      "获取已下载的",
      "다운로드된 이미지 가져오기",
      "Tomar cargado"
    ],
    downloadStart: [
      "Start Download",
      "开始下载",
      "다운로드 시작",
      "Comenzar descarga"
    ],
    downloading: [
      "Downloading...",
      "下载中...",
      "다운로드 중...",
      "Descargando..."
    ],
    downloadFailed: [
      "Failed(Retry)",
      "下载失败(重试)",
      "실패(재시도)",
      "Fallido(Reintentar)"
    ],
    downloaded: [
      "Downloaded",
      "下载完成",
      "다운로드 완료",
      "Descargado"
    ],
    packaging: [
      "Packaging...",
      "打包中...",
      "압축 중...",
      "Empaquetando..."
    ],
    status: [
      "Status",
      "状态",
      "상태",
      "Estado"
    ],
    selectChapters: [
      "Chapters",
      "章节",
      "챕터",
      "capítulos"
    ],
    cherryPick: [
      "Cherry Pick",
      "范围选择",
      "범위 선택",
      "Seleccionar individualmente"
    ],
    enable: [
      "Enable",
      "启用",
      "활성화",
      "Habilitar"
    ],
    enableTooltips: [
      "Enable the script on this site.",
      "在此站点上启用本脚本的功能。",
      "선택된 사이트에서만 스크립트를 활성화합니다.",
      "Habilitar el script en este sitio."
    ],
    enableAutoOpen: [
      "Auto Open",
      "自动打开",
      "자동 크게 보기",
      "Apertura automática"
    ],
    enableAutoOpenTooltips: [
      "Automatically open the interface of this script when entering the corresponding page.",
      "当进入对应的生效页面后，自动打开本脚本界面。",
      "해당 페이지에 들어갈 때 이 스크립트의 인터페이스를 자동으로 엽니다.",
      "Abrir automáticamente la interfaz de este script al ingresar a la página correspondiente."
    ],
    enableFlowVision: [
      "Flow Vision",
      "自适应视图",
      "Flow Vision",
      "Flow Vision"
    ],
    enableFlowVisionTooltips: [
      `Enable a new thumbnail list layout where the images in each row have uniform height, but the number of images per row is automatically adjusted. 
    <br>The overall appearance is more compact and comfortable, suitable for illustration-based websites with irregular image aspect ratios.
    <br>Note: Since some websites cannot retrieve image aspect ratio information, the effect may be impacted.`,
      `启用一种新的缩略图列表布局，使每行的图片高度一致，但自动分配每行的图片数量。
    <br>整体看起来更紧凑舒适，适合图片宽高比不规则的插画类站点。
    <br>注意：由于一些站点无法提取得知图片的宽高比，因此效果可能会受到影响。`,
      `새로운 썸네일 리스트 레이아웃을 활성화하여 각각의 행에 있는 이미지들이 동일한 높이를 가지도록 합니다. 대신 행당 이미지의 수는 자동으로 조정됩니다. 
    <br>전체적인 외관은 더 간결하고 편안하며, 불규칙한 이미지 비율을 가진 일러스트 기반 웹사이트에 적합합니다. 
    <br>참고: 일부 웹사이트는 이미지 비율 정보를 가져올 수 없으므로, 이로 인해 효과에 영향을 받을 수 있습니다.`,
      `Activar un nuevo diseño de lista de miniaturas donde las imágenes en cada fila tienen altura uniforme, pero el número de imágenes por fila se ajusta automáticamente. 
    <br>La apariencia general es más compacta y cómoda, adecuada para sitios web basados en ilustraciones con relaciones de aspecto de imagen irregulares.
    <br>Nota: Dado que algunos sitios web no pueden recuperar la información de la relación de aspecto de las imágenes, el efecto puede verse afectado.`
    ],
    addRegexp: [
      "Add Work URL Regexp",
      "添加生效地址规则",
      "URL 정규식 추가",
      "Agregar expresión regular de URL"
    ],
    failFetchReason1: [
      "Refused to connect {{domain}}(origin image url), Please check the domain blacklist: Tampermonkey > Comic Looms > Settings > XHR Security > User domain blacklist",
      "被拒绝连接{{domain}}(大图地址)，请检查域名黑名单: Tampermonkey(篡改猴) > 漫画织机 > 设置 > XHR Security >  User domain blacklist",
      "Refused to connect {{domain}}(origin image url), Please check the domain blacklist: Tampermonkey > Comic Looms > Settings > XHR Security > User domain blacklist",
      "Refused to connect {{domain}}(origin image url), Please check the domain blacklist: Tampermonkey > Comic Looms > Settings > XHR Security > User domain blacklist"
    ],
    help: [
      `
<h2>[How to Use? Where is the Entry?]</h2>
<p>The script typically activates on gallery homepages or artist homepages. For example, on E-Hentai, it activates on the gallery detail page, or on Twitter, it activates on the user&#39;s homepage or tweets.</p>
<p>When active, a <strong>&lt;🎑&gt;</strong> icon will appear at the bottom left of the page. Click it to enter the script&#39;s reading interface.</p>
<h2 style="color:red;">[Some existing issues and their solutions.]</h2>
<ul>
<li>When using Firefox to browse Twitter|X, after navigating to some pages, you need to refresh the page for this script to work on that page.</li>
<li>When using Firefox to browse Twitter|X, the download function of this script may not work.</li>
</ul>
<h4>Solution:</h4>
<p>These issues are caused by Twitter|X&#39;s Content Security Policy (CSP), which disables URL mutation detection and the Zip creation functionality.</p>
<p>You can modify Twitter|X&#39;s response header <strong>Content-Security-Policy</strong> to <strong>Content-Security-Policy: object-src '*'</strong> using other extensions.</p>
<p>For example, in the extension <strong>Header Editor</strong>, click the Add button:</p>
<ul>
<li>Name: csp-remove(any name)</li>
<li>Rule type: Modify response header</li>
<li>Match type: domain</li>
<li>Match rules: x.com</li>
<li>Execute type: normal</li>
<li>Header name: content-security-policy</li>
<li>Header value: object-src '*'</li>
</ul>
<h2>[Can the Script&#39;s Entry Point or Control Bar be Relocated?]</h2>
<p>Yes! At the bottom of the configuration panel, there&#39;s a <strong>Drag to Move</strong> option. Drag the icon to reposition the control bar anywhere on the page.</p>
<h2>[Can the Script Auto-Open When Navigating to the Corresponding Page?]</h2>
<p>Yes! There is an <strong>Auto Open</strong> option in the configuration panel. Enable it to activate this feature.</p>
<h2>[How to Zoom Images?]</h2>
<p>There are several ways to zoom images in big image reading mode:</p>
<ul>
<li>Right-click + mouse wheel</li>
<li>Keyboard shortcuts</li>
<li>Zoom controls on the control bar: click the -/+ buttons, scroll the mouse wheel over the numbers, or drag the numbers left or right.</li>
</ul>
<h2>[How to maintain spacing between large images?]</h2>
<p>In CONF > Style, modify or add: .ehvp-root { --ehvp-big-images-gap: 2px; }</p>
<h2>[How to Open Images from a Specific Page?]</h2>
<p>In the thumbnail list interface, simply type the desired page number on your keyboard (without any prompt) and press Enter or your custom shortcuts.</p>
<h2>[About the Thumbnail List]</h2>
<p>The thumbnail list interface is the script&#39;s most important feature, allowing you to quickly get an overview of the entire gallery.</p>
<p>Thumbnails are also lazy-loaded, typically loading about 20 images, which is comparable to or even fewer requests than normal browsing.</p>
<p>Pagination is also lazy-loaded, meaning not all gallery pages load at once. Only when you scroll near the bottom does the next page load.</p>
<p>Don&#39;t worry about generating a lot of requests by quickly scrolling through the thumbnail list; the script is designed to handle this efficiently.</p>
<h2>[About Auto-Loading and Pre-Loading]</h2>
<p>By default, the script automatically and slowly loads large images one by one.</p>
<p>You can still click any thumbnail to start loading and reading from that point, at which time auto-loading will stop and pre-load 3 images from the reading position.</p>
<p>Just like the thumbnail list, you don&#39;t need to worry about generating a lot of loading requests by fast scrolling.</p>
<h2>[About Downloading]</h2>
<p>Downloading is integrated with large image loading. When you finish browsing a gallery and want to save and download the images, you can click <strong>Start Download</strong> in the download panel. don&#39;t worry about re-downloading already loaded images.</p>
<p>You can also directly click <strong>Start Download</strong> in the download panel without reading.</p>
<p>Alternatively, click the <strong>Take Loaded</strong> button in the download panel if some images consistently fail to load. This will save the images that have already been loaded.</p>
<p>The download panel&#39;s status indicators provide a clear view of image loading progress.</p>
<p><strong>Note:</strong> When the download file size exceeds 1.2GB, split compression will be automatically enabled. If you encounter errors while extracting the files, please update your extraction software or use 7-Zip.</p>
<h2>[Can I Select the Download Range?]</h2>
<p>Yes, the download panel has an option to select the download range(Cherry Pick), which applies to downloading, auto-loading, and pre-loading.</p>
<p>Even if an image is excluded from the download range, you can still click its thumbnail to view it, which will load the corresponding large image.</p>
<h2>[How to Select Images on Some Illustration Sites?]</h2>
<p>In the thumbnail list, you can use some hotkeys to select images:</p>
<ul>
<li><strong>Ctrl + Left Click:</strong> Selects the image. The first selection will exclude all other images.</li>
<li><strong>Ctrl + Shift + Left Click:</strong> Selects the range of images between this image and the last selected image.</li>
<li><strong>Alt + Left Click:</strong> Excludes the image. The first exclusion will select all other images.</li>
<li><strong>Alt + Shift + Left Click:</strong> Excludes the range of images between this image and the last excluded image.</li>
</ul>
<p>In addition, there are several other methods:</p>
<ul>
<li>Middle-click on a thumbnail to open the original image url, then right-click to save the image.</li>
<li>Set the download range to 1 in the download panel. This excludes all images except the first one. Then, click on thumbnails of interest in the list, which will load the corresponding large images. After selecting, clear the download range and click <strong>Take Loaded</strong> to package and download your selected images.</li>
<li>Turn off auto-loading and set pre-loading to 1 in the configuration panel, then proceed as described above.</li>
</ul>
<h2>[Can I Operate the Script via Keyboard?]</h2>
<p>Yes! There&#39;s a <strong>Keyboard</strong> button at the bottom of the configuration panel. Click it to view or configure keyboard operations.</p>
<p>You can even configure it for one-handed full keyboard operation, freeing up your other hand!</p>
<h2>[How to Disable Auto-Open on Certain Sites?]</h2>
<p>There&#39;s a <strong>Site Profiles</strong> button at the bottom of the configuration panel. Click it to exclude certain sites from auto-opening. For example, Twitter or Booru-type sites.</p>
<h2>[How to Disable This Script on Certain Sites?]</h2>
<p>There&#39;s a <strong>Site Profiles</strong> button at the bottom of the configuration panel to exclude specific sites. Once excluded, the script will no longer activate on those sites.</p>
<p>To re-enable a site, you need to do so from a site that hasn&#39;t been excluded.</p>
<h2>[How to Feed the Author]</h2>
<p>Give me a star on <a target="_blank" href="https://github.com/MapoMagpie/eh-view-enhance">Github</a> or a good review on <a target="_blank" href="https://greasyfork.org/scripts/397848-e-hentai-view-enhance">Greasyfork</a>.</p>
<p>Please do not review on Greasyfork, as its notification system cannot track subsequent feedback. Many people leave an issue and never back.
Report issues here: <a target="_blank" href="https://github.com/MapoMagpie/eh-view-enhance/issues">issue</a></p>
<h2>[How to Reopen the Guide?]</h2>
<p>Click the <strong>Help</strong> button at the bottom of the configuration panel.</p>
`,
      `
<h2>[如何使用？入口在哪里？]</h2>
<p>脚本一般生效于画廊详情页或画家的主页或作品页。比如在E-Hentai上，生效于画廊详情页，或者在Twitter上，生效于推主的主页或推文。</p>
<p>生效时，在页面的左下方会有一个<strong>&lt;🎑&gt;</strong>图标，点击后即可进入脚本的阅读界面。</p>
<h2 style="color:red;">[一些现存的问题，以及解决方式。]</h2>
<ul>
<li>使用Firefox浏览Twitter|X时，跳转到其他页面后，需要刷新才可以使此脚本在该页面生效。</li>
<li>使用Firefox浏览Twitter|X时，此脚本的下载功能可能无法使用。</li>
</ul>
<h4>解决方式:</h4>
<p>这些问题是由于Twitter|X的内容安全策略(CSP)导致，它使URL的变动检测和创建Zip功能失效。</p>
<p>可以通过其他拓展修改Twitter|X的响应头<strong>Content-Security-Policy</strong>为<strong>Content-Security-Policy: object-src '*'</strong></p>
<p>例如在拓展<strong>Header Editor</strong>中，点击添加按钮:</p>
<ul>
<li>Name: csp-remove(随意)</li>
<li>Rule type: Modify response header</li>
<li>Match type: domain</li>
<li>Match rules: x.com</li>
<li>Execute type: normal</li>
<li>Header name: content-security-policy</li>
<li>Header value: object-src '*'</li>
</ul>
<h2>[脚本的入口或控制栏可以更改位置吗？]</h2>
<p>可以！在配置面板的下方，有一个<strong>拖拽移动</strong>的选项，对着图标进行拖动，你可以将控制栏移动到页面上的任意位置。</p>
<h2>[进入对应的页面的，可以自动打开脚本吗？]</h2>
<p>可以！在配置面板中，有一个<strong>自动打开</strong>的选项，启用即可。</p>
<h2>[如何缩放图片？]</h2>
<p>有几种方式可以在大图阅读模式中缩放图片：</p>
<ul>
<li>鼠标右键+滚轮</li>
<li>键盘快捷键</li>
<li>控制栏上的缩放控制，点击-/+按钮，或者在数字上滚动滚轮，或者左右拖动数字。</li>
</ul>
<h2>[如何让大图之间保持间隔？]</h2>
<p>在CONF > Style中，修改或添加 .ehvp-root { --ehvp-big-images-gap: 2px; }</p>
<h2>[如何打开指定页数的图片？]</h2>
<p>在缩略图列表界面中，直接在键盘上输入数字(没有提示)，然后按下回车或自定义的快捷键。</p>
<h2>[关于缩略图列表。]</h2>
<p>缩略图列表是脚本最重要的特性，可以让你快速地了解整个画廊的情况。</p>
<p>并且缩略图也是延迟加载的，通常会加载20张左右，与正常浏览所发出的请求相当，甚至更低。</p>
<p>并且分页也是延迟加载的，并不会一次性加载画廊的所有分页，只有滚动到接近底部时，才会加载下一页。</p>
<p>不用担心因为在缩略图列表中快速滚动而导致发出大量的请求，脚本充分考虑到了这一点。</p>
<h2>[关于自动加载和预加载。]</h2>
<p>默认配置下，脚本会自动且缓慢地一张接一张地加载大图。</p>
<p>你仍然可以点击任意位置的缩略图，并从该处开始加载并阅读，此时会自动加载会停止并从阅读的位置预加载3张图片。</p>
<p>同缩略图列表一样，无需担心因为快速滚动而导致发出大量的加载请求。</p>
<h2>[关于下载。]</h2>
<p>下载与大图加载是一体的，当你浏览完画廊时，突然想起来要保存下载，此时你可以在下载面板中点击<strong>开始下载</strong>，不必担心会重复下载已经加载过的图片。</p>
<p>当然你也可以不浏览，直接在下载面板中点击<strong>开始下载</strong>。</p>
<p>或者点击下载面板中的<strong>获取已下载的</strong>按钮，当一些图片总是加载失败的时候，你可以使用此功能来保存已经加载过的图片。</p>
<p>通过下载面板中的状态可以直观地看到图片加载的情况。</p>
<p><strong>注意：</strong>当下载文件大小超过1.2G后，会自动启用分卷压缩。当使用解压软件解压出错时，请更新解压软件或使用7-Zip。</p>
<h2>[可以选择下载范围吗？]</h2>
<p>可以，在下载面板中有选择下载范围的功能，该功能对下载、自动加载、预加载都生效。</p>
<p>另外，如果一张图片被排除在下载范围之外，你仍然可以点击该图片的缩略图进行浏览，这会加载对应的大图。</p>
<h2>[如何在一些插画网站上挑选图片？]</h2>
<p>在缩略图列表中使用一些快捷键可以进行图片的挑选。</p>
<ul>
<li><strong>Ctrl+鼠标左键：</strong> 选中该图片，当第一次选中时，其他的图片都会被排除。</li>
<li><strong>Ctrl+Shift+鼠标左键：</strong> 选中该图片与上一张选中的图片之间的范围。</li>
<li><strong>Alt+鼠标左键：</strong> 排除该图片，当第一次排除时，其他的图片都会被选中。</li>
<li><strong>Alt+Shift+鼠标左键：</strong> 排除该图片与上一张排除的图片之间的范围。</li>
</ul>
<p>除此之外还有几种方式：</p>
<ul>
<li>在缩略图上按下鼠标中键，即可打开图片的原始地址，之后你可以右键保存图片。</li>
<li>在下载面板中设置下载范围为1，这样会排除第一张图片以外的所有图片，之后在缩略图列表上点击你感兴趣的图片，对应的大图会被加载，最终挑选完毕后，删除掉下载范围并点击<strong>获取已下载的</strong>，这样你挑选的图片会被打包下载。</li>
<li>在配置面板中关闭自动加载，并设置预加载数量为1，之后与上面的方法类似。</li>
</ul>
<h2>[可以通过键盘来操作吗？]</h2>
<p>可以！在配置面板的下方，有一个<strong>快捷键</strong>按钮，点击后可以查看键盘操作，或进行配置。</p>
<p>甚至可以配置为单手全键盘操作，解放另一只手！</p>
<h2>[不想在某些网站启用自动打开功能？]</h2>
<p>在配置面板的下方，有一个<strong>站点配置</strong>按钮，点击后可以对一些不适合自动打开的网站进行排除。比如Twitter或Booru类的网站。</p>
<h2>[不想在某些网站使用这个脚本？]</h2>
<p>在配置面板的下方，有一个<strong>站点配置</strong>的按钮，可对一些站点进行排除，排除后脚本不会再生效。</p>
<p>如果想重新启用该站点，需要在其他未排除的站点中启用被禁用的站点。</p>
<h2>[如何Feed作者。]</h2>
<p>给我<a target="_blank" href="https://github.com/MapoMagpie/eh-view-enhance">Github</a>星星，或者<a target="_blank" href="https://greasyfork.org/scripts/397848-e-hentai-view-enhance">Greasyfork</a>上好评。</p>
<p>请勿在Greasyfork上反馈问题，因为该站点的通知系统无法跟踪后续的反馈。很多人只是留下一个问题，再也没有回来过。
请在此反馈问题: <a target="_blank" href="https://github.com/MapoMagpie/eh-view-enhance/issues">issue</a></p>
<h2>[如何再次打开指南？]</h2>
<p>在配置面板的下方，点击<strong>帮助</strong>按钮。</p>
`,
      `
<h2>[사용 방법? 스크립트는 어떻게 실행되나요?]</h2>
<p>이 스크립트는 주로 갤러리 홈페이지나 아티스트 홈페이지에서 활성화됩니다. 예를 들어, E-Hentai에서는 갤러리 상세 페이지에서, Twitter에서는 사용자의 홈 또는 트윗에서, arca.live에서는 작성된 글에서 활성화됩니다.</p>
<p>스크립트가 활성화되면 페이지의 왼쪽 하단에 <strong>&lt;🎑&gt;</strong> 아이콘이 나타납니다. 이 아이콘을 클릭하면 스크립트의 읽기 화면으로 진입할 수 있습니다.</p>

<h2>[스크립트의 진입점 또는 컨트롤 바를 이동할 수 있나요?]</h2>
<p>네! 설정 패널 하단에 <strong>드래그해서 컨트롤 바 이동</strong> 옵션이 있습니다. 이 아이콘을 드래그하여 페이지 내 원하는 위치로 컨트롤 바를 이동할 수 있습니다.</p>

<h2>[해당 페이지로 이동할 때 스크립트가 자동으로 열리게 할 수 있나요?]</h2>
<p>네! 설정 패널에서 <strong>자동으로 이미지 열기</strong> 옵션을 활성화하면 이 기능이 켜집니다.</p>

<h2>[이미지를 확대하려면 어떻게 해야 하나요?]</h2>
<p>큰 이미지 보기 모드에서 이미지를 확대하는 방법은 여러 가지가 있습니다:</p>
<ul>
<li>오른쪽 클릭 + 마우스 휠</li>
<li>키보드 단축키</li>
<li>컨트롤 바의 확대/축소 컨트롤: -/+ 버튼을 클릭하거나, 숫자 위에서 마우스 휠을 스크롤하거나, 숫자를 좌우로 드래그하세요.</li>
</ul>

<h2>[큰 이미지 간의 간격을 유지하려면 어떻게 해야 하나요?]</h2>
<p>CONF > Style에서 다음을 수정하거나 추가하세요: .ehvp-root { --ehvp-big-images-gap: 2px; }</p>

<h2>[특정 페이지의 이미지를 열려면 어떻게 해야 하나요?]</h2>
<p>썸네일 리스트 화면에서 원하는 페이지 번호를 키보드로 입력하고 Enter 키나 사용자 지정 단축키를 누르세요.</p>

<h2>[썸네일 리스트에 대하여]</h2>
<p>썸네일 리스트 화면은 스크립트의 가장 중요한 기능으로, 전체 갤러리를 빠르게 둘러볼 수 있게 해줍니다.</p>
<p>썸네일은 지연 로딩되며, 일반적으로 약 20개의 이미지를 로드합니다. 이는 일반적인 브라우징보다 요청 수가 적거나 비슷한 정도입니다.</p>
<p>페이징 또한 지연 로딩됩니다. 즉, 모든 갤러리의 페이지가 한 번에 로드되지 않습니다. 하단 근처로 스크롤할 때만 다음 페이지가 로드됩니다.</p>
<p>썸네일 리스트를 빠르게 스크롤해도 괜찮습니다. 이 스크립트는 그런 경우에도 많은 요청이 발생하지 않도록 효율적으로 설계되어 있습니다.</p>

<h2>[자동 로딩 및 사전 로딩에 대하여]</h2>
<p>기본적으로 스크립트는 큰 이미지를 하나씩 자동으로 천천히 로드합니다.</p>
<p>원하는 썸네일을 클릭하여 그 지점에서 로딩 및 읽기를 시작할 수 있으며, 이때 자동 로딩이 중지되고 읽기 위치에서 3개의 이미지를 사전 로딩합니다.</p>
<p>썸네일 리스트와 마찬가지로 빠르게 스크롤해도 많은 로딩 요청이 발생하지 않도록 설계되어 있으니 걱정하지 않으셔도 됩니다.</p>

<h2>[다운로드에 대하여]</h2>
<p>다운로드는 큰 이미지 로딩과 통합되어 있습니다. 갤러리를 모두 본 후 이미지를 저장하고 다운로드하려면 다운로드 패널에서 <strong>다운로드 시작</strong>을 클릭하세요. 이미 로드된 이미지를 다시 다운로드하는 것에 대해서는 걱정 안 하셔도 됩니다.</p>
<p>이미지를 보지 않고 바로 다운로드 패널에서 <strong>다운로드 시작</strong>을 클릭할 수도 있습니다.</p>
<p>또한 일부 이미지가 로드되지 않을 때는 다운로드 패널에서 <strong>이미 다운로드한 이미지 가져오기</strong> 버튼을 클릭하여 이미 로드된 이미지를 저장할 수 있습니다.</p>
<p>다운로드 패널의 상태 표시기를 통해 이미지 로딩 진행 상황을 명확히 볼 수 있습니다.</p>
<p><strong>참고:</strong> 다운로드 파일 크기가 1.2GB를 초과할 경우, 분할 압축이 자동으로 활성화됩니다. 파일을 추출하는 동안 오류가 발생하면 추출 소프트웨어를 업데이트하거나 7-Zip을 사용하세요.</p>

<h2>[다운로드 범위를 선택할 수 있나요?]</h2>
<p>네, 다운로드 패널에는 다운로드 범위를 선택할 수 있는 옵션(Cherry Pick)이 있으며, 이는 다운로드, 자동 로딩 및 사전 로딩에 적용됩니다.</p>
<p>다운로드 범위에서 제외된 이미지라도 썸네일을 클릭하여 해당 큰 이미지를 로드할 수 있습니다.</p>

<h2>[일러스트 사이트에서 이미지를 선택하려면 어떻게 해야 하나요?]</h2>
<p>썸네일 리스트에서 다음 핫키를 사용하여 이미지를 선택할 수 있습니다:</p>
<ul>
<li><strong>Ctrl + 왼쪽 클릭:</strong> 이미지를 선택합니다. 첫 번째 선택은 다른 모든 이미지를 제외합니다.</li>
<li><strong>Ctrl + Shift + 왼쪽 클릭:</strong> 이 이미지와 마지막으로 선택된 이미지 사이의 이미지를 선택합니다.</li>
<li><strong>Alt + 왼쪽 클릭:</strong> 이미지를 제외합니다. 첫 번째 제외는 다른 모든 이미지를 선택합니다.</li>
<li><strong>Alt + Shift + 왼쪽 클릭:</strong> 이 이미지와 마지막으로 제외된 이미지 사이의 이미지를 제외합니다.</li>
</ul>
<p>추가적으로 몇 가지 방법이 더 있습니다:</p>
<ul>
<li>썸네일에서 중간 클릭으로 원본 이미지 URL을 열고, 그 후 오른쪽 클릭하여 이미지를 저장합니다.</li>
<li>다운로드 패널에서 다운로드 범위를 1로 설정하세요. 이는 첫 번째 이미지 이외의 모든 이미지를 제외합니다. 그런 다음 목록에서 관심 있는 썸네일을 클릭하여 해당 큰 이미지를 로드합니다. 선택한 후, 다운로드 범위를 해제하고 <strong>이미 다운로드한 이미지 가져오기</strong>를 클릭하여 선택한 이미지를 패키징하고 다운로드합니다.</li>
<li>자동 로딩을 끄고 설정 패널에서 사전 로딩을 1로 설정한 다음, 위의 방법대로 진행합니다.</li>
</ul>

<h2>[키보드로 스크립트를 조작할 수 있나요?]</h2>
<p>네! 설정 패널 하단에 <strong>단축키</strong> 버튼이 있습니다. 이 버튼을 클릭하여 키보드 조작을 확인하거나 설정할 수 있습니다.</p>
<p>한 손으로 모든 키보드 조작을 할 수 있도록 설정할 수도 있어, 다른 손을 자유롭게 쓸 수 있습니다!</p>

<h2>[특정 사이트에서 자동 열기를 비활성화하려면 어떻게 해야 하나요?]</h2>
<p>설정 패널 하단에 있는 <strong>사이트 설정</strong> 버튼을 클릭하여 특정 사이트에서 자동 열기를 제외할 수 있습니다. 예를 들어, Twitter나 Booru 타입의 사이트를 제외할 수 있습니다.</p>

<h2>[특정 사이트에서 이 스크립트를 비활성화하려면 어떻게 해야 하나요?]</h2>
<p>설정 패널 하단의 <strong>사이트 설정</strong> 버튼을 클릭하여 특정 사이트를 제외할 수 있습니다. 제외된 사이트에서는 더 이상 스크립트가 활성화되지 않습니다.</p>
<p>사이트를 다시 활성화하려면 제외되지 않은 사이트에서 설정해야 합니다.</p>

<h2>[개발자에게 도움을 주고 싶다면?]</h2>
<p><a target="_blank" href="https://github.com/MapoMagpie/eh-view-enhance">Github</a>에 별을 주시거나, <a target="_blank" href="https://greasyfork.org/scripts/397848-e-hentai-view-enhance">Greasyfork</a>에서 좋은 리뷰를 남겨주세요.</p>
<p>단, Greasyfork에 버그 제보 내용의 리뷰를 남기지 마세요. 해당 플랫폼의 알림 시스템이 후속 피드백을 추적할 수 없습니다. 많은 사람들이 문제를 제기하고 다시 돌아오지 않습니다.<br> 문제는 여기에 보고해 주세요: <a target="_blank" href="https://github.com/MapoMagpie/eh-view-enhance/issues">이슈</a></p>

<h2>[가이드를 다시 열려면?]</h2>
<p>설정 패널 하단에 있는 <strong>도움말</strong> 버튼을 클릭하세요.</p>

<h2>[해결되지 않은 문제들]</h2>
<ul>
<li>Firefox를 사용하여 Twitter의 홈페이지를 새 탭에서 연 후 사용자의 홈페이지로 이동하면 스크립트가 활성화되지 않으며 페이지 새로고침이 필요합니다.</li>
<li>Chrome과 Firefox의 프레임내에서 사이트를 여는 것을 방지하는 확장 프로그램을 사용하는 경우, E-Hentai에서 갤러리 내 이미지를 열 수 없게 되며 설정 메뉴 또한 표시되지 않습니다. 이 문제를 해결하려면 확장 프로그램을 비활성화하거나 예외 항목을 추가하세요.</li>
</ul>

<h2>[작동 원리]</h2>
<p>이 스크립트는 단순한 jQuery(구형 스크립트)에서부터 최첨단 Vue.js 프레임워크에 이르기까지 매우 다양한 웹 기술에서 작동합니다. 이 스크립트는 해당 기술들을 해킹하지 않고도 상호작용할 수 있도록 최적화되어 있습니다.</p>
<p>설정 패널의 자동 저장 및 사이트별 설정 기능은 스크립트의 본체 코드에 저장되지 않으며, 스크립트에서 수집하는 정보는 로컬 컴퓨터에만 저장됩니다.</p>
<p>또한 이 스크립트는 많은 이미지를 처리할 수 있도록 효율적으로 설계되었습니다. 이미지 로딩 시점에서는 브라우저에 의존하며, 이미지 관련 데이터는 사용자 시스템의 메모리로 직접 로드됩니다. 이는 데이터 전송량과 서버 요청 수를 줄이면서도 빠르고 유연한 이미징을 가능하게 합니다.</p>

<h2>[스크립트가 작동하지 않는 이유는 무엇인가요?]</h2>
<p>이 스크립트는 웹페이지의 HTML 구조와 상호작용하기 때문에 페이지가 변경될 경우(예: 개발자가 업데이트를 하거나 광고를 삽입할 때) 예상대로 작동하지 않을 수 있습니다. 이 경우, 브라우저 콘솔을 열어 오류 메시지를 확인하세요. 오류 메시지가 표시되면 GitHub 이슈 섹션에 보고해 주세요.</p>

<h2>[기타 정보]</h2>
<p>설정 패널에서 다양한 설정 옵션을 사용할 수 있으며, 각 설정은 사용자 환경을 최적화하는 데 도움이 됩니다. 스크립트가 의도대로 작동하지 않는 경우 GitHub 이슈에서 해결 방법을 찾아보세요.</p>
`,
      `
<h2>¿Cómo se usa? ¿Dónde está la entrada</h2>
<p>El script generalmente se activa en las páginas principales de galerías o en las páginas principales de artistas. Por ejemplo, en E-Hentai, se activa en la página de detalles de la galería, o en Twitter, se activa en la página principal del usuario o en los tweets.p>
<p>Cuando esté activo, aparecerá un ícono de <strong>&lt;🎑&gt;</strong> en la parte inferior izquierda de la página.</p>
<h2 style="color:red;">[Algunos problemas no resueltos]</h2>
<ul>
<li>Al usar Firefox para abrir la página principal de Twitter en una nueva pestaña y luego navegar a la página principal del usuario, el script no se activa y requiere actualizar la página.</li>
<li>En Firefox, la función de descarga no funciona en el dominio twitter.com. Firefox no redirige twitter.com a x.com cuando se abre en una nueva pestaña. Debes usar x.com en lugar de twitter.com.</li>
</ul>
<h2>[¿Se puede reubicar el punto de entrada o la barra de control del script?]</h2>
<p>¡Sí! En la parte inferior del panel de configuración, hay una opción de <strong>Arrastrar para mover</strong>. Arrastra el ícono para reposicionar la barra de control en cualquier parte de la página.</p>
<h2>[¿Puede el script abrirse automáticamente al navegar a la página correspondiente?]</h2>
<p>¡Sí! Hay una opción de <strong>Apertura Automática</strong> en el panel de configuración. Actívala para habilitar esta función.</p>
<h2>[¿Cómo hacer zoom en las imágenes?]</h2>
<p>Hay varias formas de hacer zoom en las imágenes en el modo de lectura de imágenes grandes:</p>
<ul>
<li>Clic derecho + rueda del ratón</li>
<li>Atajos de teclado</li>
<li>Controles de zoom en la barra de control: haz clic en los botones -/+, desplaza la rueda del ratón sobre los números o arrastra los números hacia la izquierda o derecha.</li>
</ul>
<h2>[¿Cómo mantener el espacio entre imágenes grandes?]</h2>
<p>En CONF > Style, modifique o añada: .ehvp-root { --ehvp-big-images-gap: 2px; }</p>
<h2>[¿Cómo abrir imágenes de una página específica?]</h2>
<p>En la interfaz de lista de miniaturas, simplemente escribe el número de página deseado en tu teclado (sin necesidad de un aviso) y presiona Enter o utiliza tus atajos personalizados.</p>
<h2>[Acerca de la Lista de Miniaturas]</h2>
<p>La interfaz de lista de miniaturas es la característica más importante del script, ya que te permite obtener rápidamente una vista general de toda la galería.</p>
<p>Las miniaturas se cargan de forma diferida, normalmente cargando alrededor de 20 imágenes, lo que es comparable o incluso implica menos solicitudes que la navegación normal.</p>
<p>La paginación también se carga de manera diferida, lo que significa que no todas las páginas de la galería se cargan a la vez. Solo cuando te acercas al final de la página, se carga la siguiente.</p>
<p>No te preocupes por generar muchas solicitudes al desplazarte rápidamente por la lista de miniaturas; el script está diseñado para manejar esto de manera eficiente.</p>
<h2>[Acerca de la Carga Automática y la Carga Anticipada]</h2>
<p>Por defecto, el script carga automáticamente y de manera gradual las imágenes grandes una por una.</p>
<p>Aún puedes hacer clic en cualquier miniatura para comenzar a cargar y leer desde ese punto, momento en el cual la carga automática se detendrá y se pre-cargarán 3 imágenes desde la posición de lectura.</p>
<p>Al igual que con la lista de miniaturas, no necesitas preocuparte por generar muchas solicitudes de carga al desplazarte rápidamente.</p>
<h2>[Acerca de la Descarga]</h2>
<p>La descarga está integrada con la carga de imágenes grandes. Cuando termines de navegar por una galería y quieras guardar y descargar las imágenes, puedes hacer clic en <strong>Iniciar Descarga</strong> en el panel de descargas. No te preocupes por volver a descargar las imágenes ya cargadas.</p>
<p>También puedes hacer clic directamente en <strong>Iniciar Descarga</strong> en el panel de descargas sin necesidad de leer.</p>
<p>Alternativamente, haz clic en el botón <strong>Tomar Cargadas</strong> en el panel de descargas si algunas imágenes no se cargan consistentemente. Esto guardará las imágenes que ya se han cargado.</p>
<p>Los indicadores de estado del panel de descargas proporcionan una visión clara del progreso de la carga de imágenes.</p>
<p><strong>Nota:</strong> Cuando el tamaño del archivo de descarga supere los 1.2 GB, se habilitará automáticamente la compresión dividida. Si encuentras errores al extraer los archivos, por favor actualiza tu software de extracción o usa 7-Zip.</p>
<h2>[¿Puedo seleccionar el rango de descarga?]</h2>
<p>Sí, el panel de descargas tiene una opción para seleccionar el rango de descarga (Cherry Pick), que se aplica a la descarga, carga automática y carga anticipada.</p>
<p>Incluso si una imagen está excluida del rango de descarga, aún puedes hacer clic en su miniatura para verla, lo que cargará la imagen grande correspondiente.</p>
<h2>[¿Cómo seleccionar imágenes en algunos sitios de ilustración?]</h2>
<p>En la lista de miniaturas, puedes usar algunas teclas de acceso rápido para seleccionar imágenes:</p>
<ul>
<li><strong>Ctrl + Clic Izquierdo:</strong> Selecciona la imagen. La primera selección excluirá todas las demás imágenes.</li>
<li><strong>Ctrl + Shift + Clic Izquierdo:</strong> Selecciona el rango de imágenes entre esta imagen y la última imagen seleccionada.</li>
<li><strong>Alt + Clic Izquierdo:</strong> Excluye la imagen. La primera exclusión seleccionará todas las demás imágenes.</li>
<li><strong>Alt + Shift + Clic Izquierdo:</strong> Excluye el rango de imágenes entre esta imagen y la última imagen excluida.</li>
</ul>
<p>Además, hay otros métodos:</p>
<ul>
<li>Haz clic en el botón del medio en una miniatura para abrir la URL de la imagen original, luego haz clic derecho para guardar la imagen.</li>
<li>Establece el rango de descarga en 1 en el panel de descargas. Esto excluirá todas las imágenes excepto la primera. Luego, haz clic en las miniaturas de interés en la lista, lo que cargará las imágenes grandes correspondientes. Después de seleccionar, borra el rango de descarga y haz clic en <strong>Tomar Cargadas</strong> para empaquetar y descargar tus imágenes seleccionadas.</li>
<li>Desactiva la carga automática y establece la carga anticipada en 1 en el panel de configuración, luego procede como se describe anteriormente.</li>
</ul>
<h2>[¿Puedo operar el script mediante el teclado?]</h2>
<p>¡Sí! Hay un botón del <strong>Teclado</strong> en la parte inferior del panel de configuración. Haz clic en él para ver o configurar las operaciones del teclado.</p>
<p>¡Incluso puedes configurarlo para operar con una sola mano, liberando así tu otra mano!</p>
<h2>[¿Cómo desactivar la apertura automática en ciertos sitios?]</h2>
<p>Hay un botón de <strong>Perfiles de Sitio<strong> en la parte inferior del panel de configuración. Haz clic en él para excluir ciertos sitios de la apertura automática. Por ejemplo, sitios como Twitter o de tipo Booru.</p>
<h2>[¿Cómo desactivar este script en ciertos sitios?]</h2>
<p>Hay un botón de <strong>Perfiles de Sitio</strong> en la parte inferior del panel de configuración para excluir sitios específicos. Una vez excluidos, el script ya no se activará en esos sitios.</p>
<p>Para volver a habilitar un sitio, necesitas hacerlo desde un sitio que no haya sido excluido.</p>
<h2>[¿Cómo apoyar al autor?]</h2>
<p>Déjame una estrella en <a target='_blank' href='https://github.com/MapoMagpie/eh-view-enhance'>Github</a> o una buena reseña en <a target='_blank' href='https://greasyfork.org/scripts/397848-e-hentai-view-enhance'>Greasyfork</a>.</p>
<p>Por favor, no dejes reseñas en Greasyfork, ya que su sistema de notificaciones no puede rastrear comentarios posteriores. Muchas personas dejan un problema y nunca vuelven.
Reporta problemas aquí: <a target='_blank' href='https://github.com/MapoMagpie/eh-view-enhance/issues'>issue</a></p>
<h2>[¿Cómo reabrir la guía?]</h2>
<p>Haz clic en el botón de <strong>Ayuda</strong> en la parte inferior del panel de configuración.</p>
`
    ]
  };
  const kbInFullViewGridData = {
    "open-full-view-grid": [
      "Enter Read Mode",
      "进入阅读模式",
      "읽기 모드 시작",
      "Entrar en modo de lectura"
    ],
    "start-download": [
      "Start Download",
      "开始下载",
      "다운로드 시작",
      "Iniciar Descarga"
    ],
    "step-image-prev": [
      "Go Prev Image",
      "切换到上一张图片",
      "이전 이미지",
      "Ir a la imagen anterior"
    ],
    "step-image-next": [
      "Go Next Image",
      "切换到下一张图片",
      "다음 이미지",
      "Ir a la imagen siguiente"
    ],
    "exit-big-image-mode": [
      "Exit Big Image Mode",
      "退出大图模式",
      "이미지 크게 보기 종료",
      "Salir del modo de imagen grande"
    ],
    "step-to-first-image": [
      "Go First Image",
      "跳转到第一张图片",
      "첫 이미지로 이동",
      "Ir a la primera imagen"
    ],
    "step-to-last-image": [
      "Go Last Image",
      "跳转到最后一张图片",
      "마지막 이미지로 이동",
      "Ir a la última imagen"
    ],
    "scale-image-increase": [
      "Increase Image Scale",
      "放大图片",
      "이미지 확대",
      "Aumentar la escala de la imagen"
    ],
    "scale-image-decrease": [
      "Decrease Image Scale",
      "缩小图片",
      "이미지 축소",
      "Disminuir la escala de la imagen"
    ],
    "scroll-image-up": [
      "Scroll Image Up (Please Keep Default Keys)",
      "向上滚动图片 (请保留默认按键)",
      "이미지 위로 스크롤 (기본 키는 그대로 두십시오)",
      "Desplazar la imagen hacia arriba (Por favor, mantener las teclas predeterminadas)"
    ],
    "scroll-image-down": [
      "Scroll Image Down (Please Keep Default Keys)",
      "向下滚动图片 (请保留默认按键)",
      "이미지 아래로 스크롤 (기본 키는 그대로 두십시오)",
      "Desplazar la imagen hacia abajo (Por favor, mantener las teclas predeterminadas)"
    ],
    "toggle-auto-play": [
      "Toggle Auto Play",
      "切换自动播放",
      "자동 재생 시작/중지",
      "Alternar reproducción automática"
    ],
    "round-read-mode": [
      "Switch Reading mode (Loop)",
      "切换阅读模式(循环)",
      "읽기 모드 전환(루프)",
      "Cambiar modo de lectura (bucle)"
    ],
    "toggle-reverse-pages": [
      "Toggle Pages Reverse",
      "切换阅读方向",
      "페이지 반전 전환",
      "Alternar páginas hacia atrás"
    ],
    "rotate-image": [
      "Rotate Image",
      "旋转图片",
      "이미지 회전",
      "Girar imagen"
    ],
    "cherry-pick-current": [
      "Cherry Pick Current Images",
      "选择当前图片",
      "체리픽 현재 이미지",
      "Imágenes actuales de Cherry Pick"
    ],
    "exclude-current": [
      "Exclude current images",
      "排除当前图片",
      "현재 이미지 제외",
      "Excluir imágenes actuales"
    ],
    "open-big-image-mode": [
      "Enter Big Image Mode",
      "进入大图阅读模式",
      "이미지 크게 보기",
      "Entrar al modo de imagen grande"
    ],
    "pause-auto-load-temporarily": [
      "Pause Auto Load Temporarily",
      "临时停止自动加载",
      "자동 이미지 로딩 일시 중지",
      "Pausar carga automática temporalmente"
    ],
    "exit-full-view-grid": [
      "Exit Read Mode",
      "退出阅读模式",
      "읽기 모드 종료",
      "Salir del modo de lectura"
    ],
    "columns-increase": [
      "Increase Columns ",
      "增加每行数量",
      "열 수 늘리기",
      "Aumentar columnas"
    ],
    "columns-decrease": [
      "Decrease Columns ",
      "减少每行数量",
      "열 수 줄이기",
      "Disminuir columnas"
    ],
    "retry-fetch-next-page": [
      "Try Fetch Next Page",
      "重新加载下一分页",
      "다음 페이지 로딩 재시도",
      "Intentar cargar la siguiente página"
    ],
    "go-prev-chapter": [
      "Switch To Previous Chapter",
      "切换到上一章节",
      "이전 장으로 전환",
      "Cambiar al capítulo anterior"
    ],
    "go-next-chapter": [
      "Switch To Next Chapter",
      "切换到下一章节",
      "다음 장으로 전환",
      "cambiar al siguiente capítulo"
    ],
    "resize-flow-vision": [
      "Resize Thumbnail Grid Layout",
      "Resize Thumbnail Grid Layout",
      "Resize Thumbnail Grid Layout",
      "Resize Thumbnail Grid Layout"
    ]
  };
  function convert(data) {
    const entries = Object.entries(data);
    const ret = entries.reduce((prev, [k, v]) => {
      prev[k] = new I18nValue(v);
      return prev;
    }, {});
    return ret;
  }
  const i18n = {
    ...convert(i18nData),
    keyboard: convert(kbInFullViewGridData)
  };

  const moonViewCeremony = `<🎑>`;
  const zoomIcon = `⇱⇲`;
  const icons = {
    moonViewCeremony,
    zoomIcon
  };

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  function transactionId() {
    return window.btoa(uuid());
  }
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(_match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  }

  const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent);
  function defaultColumns() {
    const screenWidth = window.screen.width;
    return screenWidth > 2500 ? 7 : screenWidth > 1900 ? 6 : screenWidth > 700 ? 5 : 3;
  }
  function defaultRowHeight() {
    const vh = window.screen.availHeight;
    return Math.floor(vh / 3.4);
  }
  function defaultConf() {
    return {
      colCount: defaultColumns(),
      rowHeight: defaultRowHeight(),
      readMode: "pagination",
      autoLoad: true,
      fetchOriginal: false,
      restartIdleLoader: 2e3,
      threads: 3,
      downloadThreads: 4,
      timeout: 10,
      version: CONF_VERSION,
      debug: true,
      first: true,
      reversePages: false,
      pageHelperAbTop: "unset",
      pageHelperAbLeft: "20px",
      pageHelperAbBottom: "20px",
      pageHelperAbRight: "unset",
      imgScale: 100,
      defaultImgScaleModeC: 60,
      autoPageSpeed: 5,
      // pagination readmode = 5, continuous readmode = 1
      autoPlay: false,
      hdThumbnails: false,
      filenameTemplate: "{number}-{title}",
      preventScrollPageTime: 100,
      archiveVolumeSize: 1200,
      pixivConvertTo: "GIF",
      autoCollapsePanel: true,
      minifyPageHelper: IS_MOBILE ? "never" : "inBigMode",
      keyboards: { inBigImageMode: {}, inFullViewGrid: {}, inMain: {} },
      siteProfiles: {},
      muted: false,
      volume: 50,
      mcInSites: ["18comic"],
      paginationIMGCount: 1,
      hitomiFormat: "auto",
      autoOpen: false,
      autoLoadInBackground: true,
      reverseMultipleImagesPost: true,
      ehentaiTitlePrefer: "japanese",
      scrollingDelta: 300,
      scrollingSpeed: 20,
      id: uuid(),
      configPatchVersion: 0,
      displayText: {},
      customStyle: "",
      magnifier: false,
      autoEnterBig: false,
      pixivJustCurrPage: false,
      pixivAscendWorks: false,
      filenameOrder: "auto",
      dragImageOut: false,
      excludeVideo: false,
      enableFilter: false,
      imgNodeActions: [],
      minRatio: 0.5
    };
  }
  const CONF_VERSION = "4.4.0";
  const CONFIG_KEY = "ehvh_cfg_";
  function getStorageMethod() {
    if (typeof _GM_getValue === "function" && typeof _GM_setValue === "function") {
      return {
        setItem: (key, value) => _GM_setValue(key, value),
        getItem: (key) => _GM_getValue(key)
      };
    } else if (typeof localStorage !== "undefined") {
      return {
        setItem: (key, value) => localStorage.setItem(key, value),
        getItem: (key) => localStorage.getItem(key)
      };
    } else {
      throw new Error("No supported storage method found");
    }
  }
  const storage = getStorageMethod();
  function getConf() {
    const cfgStr = storage.getItem(CONFIG_KEY);
    if (cfgStr) {
      const cfg2 = JSON.parse(cfgStr);
      if (cfg2.version === CONF_VERSION) {
        return confHealthCheck(cfg2);
      }
    }
    const cfg = defaultConf();
    saveConf(cfg);
    return cfg;
  }
  function confHealthCheck(cf) {
    let changed = false;
    const defa = defaultConf();
    const defaKeys = Object.keys(defa);
    defaKeys.forEach((key) => {
      if (cf[key] === void 0) {
        cf[key] = defa[key];
        changed = true;
      }
    });
    const cfKeys = Object.keys(cf);
    for (const k of cfKeys) {
      if (!defaKeys.includes(k)) {
        delete cf[k];
        changed = true;
      }
    }
    ["pageHelperAbTop", "pageHelperAbLeft", "pageHelperAbBottom", "pageHelperAbRight"].forEach((key) => {
      if (cf[key] !== "unset") {
        const pos = parseInt(cf[key]);
        const screenLimit = key.endsWith("Right") || key.endsWith("Left") ? window.screen.width : window.screen.height;
        if (isNaN(pos) || pos < 5 || pos > screenLimit) {
          cf[key] = "5px";
          changed = true;
        }
      }
    });
    if (!["pagination", "continuous", "horizontal"].includes(cf.readMode)) {
      cf.readMode = "pagination";
      changed = true;
    }
    if (cf.imgScale === void 0 || isNaN(cf.imgScale) || cf.imgScale === 0) {
      cf.imgScale = cf.readMode === "continuous" ? cf.defaultImgScaleModeC : 100;
      changed = true;
    }
    const newCf = patchConfig(cf);
    if (newCf) {
      cf = newCf;
      changed = true;
    }
    if (changed) {
      saveConf(cf);
    }
    return cf;
  }
  function patchConfig(cf) {
    let changed = false;
    if (cf.configPatchVersion < 8) {
      cf.siteProfiles = {};
      cf.configPatchVersion = 8;
      cf.colCount = defaultColumns();
      cf.keyboards = { inBigImageMode: {}, inFullViewGrid: {}, inMain: {} };
      changed = true;
    }
    if (cf.configPatchVersion < 9) {
      delete cf.siteProfiles["rule34"];
      cf.configPatchVersion = 9;
      changed = true;
    }
    if (cf.configPatchVersion < 10) {
      cf.customStyle = "";
      cf.configPatchVersion = 10;
      changed = true;
    }
    if (cf.configPatchVersion < 11) {
      cf.siteProfiles["colamanga"] = { enable: false, enableAutoOpen: true, enableFlowVision: true, workURLs: [] };
      cf.configPatchVersion = 11;
      changed = true;
    }
    return changed ? cf : null;
  }
  function resetConf() {
    if (confirm(i18n.resetConfig.get() + " ?")) saveConf(defaultConf());
  }
  function saveConf(c) {
    storage.setItem(CONFIG_KEY, JSON.stringify(c));
  }
  const conf = getConf();
  const transient = { imgSrcCSP: false, originalPolicy: "" };
  const ConfigItems = [
    { key: "colCount", typ: "number" },
    { key: "rowHeight", typ: "number" },
    { key: "threads", typ: "number" },
    { key: "downloadThreads", typ: "number" },
    { key: "paginationIMGCount", typ: "number" },
    { key: "timeout", typ: "number" },
    { key: "preventScrollPageTime", typ: "number" },
    { key: "autoPageSpeed", typ: "number" },
    { key: "scrollingDelta", typ: "number" },
    { key: "scrollingSpeed", typ: "number" },
    { key: "fetchOriginal", typ: "boolean", gridColumnRange: [1, 6] },
    { key: "autoLoad", typ: "boolean", gridColumnRange: [6, 11] },
    { key: "reversePages", typ: "boolean", gridColumnRange: [1, 6] },
    { key: "autoPlay", typ: "boolean", gridColumnRange: [6, 11] },
    { key: "autoLoadInBackground", typ: "boolean", gridColumnRange: [1, 6] },
    { key: "autoOpen", typ: "boolean", gridColumnRange: [6, 11] },
    { key: "magnifier", typ: "boolean", gridColumnRange: [1, 6] },
    { key: "autoEnterBig", typ: "boolean", gridColumnRange: [6, 11] },
    { key: "dragImageOut", typ: "boolean", gridColumnRange: [1, 6] },
    { key: "hdThumbnails", typ: "boolean", gridColumnRange: [6, 11] },
    { key: "autoCollapsePanel", typ: "boolean", gridColumnRange: [1, 11] },
    { key: "pixivJustCurrPage", typ: "boolean", gridColumnRange: [1, 11], displayInSite: /pixiv.net/ },
    { key: "pixivAscendWorks", typ: "boolean", gridColumnRange: [1, 11], displayInSite: /pixiv.net/ },
    { key: "reverseMultipleImagesPost", typ: "boolean", gridColumnRange: [1, 11], displayInSite: /(x.com|twitter.com)\// },
    { key: "excludeVideo", typ: "boolean", gridColumnRange: [1, 11], displayInSite: /(x.com|twitter.com|kemono.su)\// },
    {
      key: "readMode",
      typ: "select",
      options: [
        { value: "pagination", display: "Pagination" },
        { value: "continuous", display: "Continuous" },
        { value: "horizontal", display: "Horizontal" }
      ]
    },
    {
      key: "minifyPageHelper",
      typ: "select",
      options: [
        { value: "always", display: "Always" },
        { value: "inBigMode", display: "InBigMode" },
        { value: "never", display: "Never" }
      ]
    },
    {
      key: "hitomiFormat",
      typ: "select",
      options: [
        { value: "auto", display: "Auto" },
        { value: "avif", display: "Avif" },
        { value: "webp", display: "Webp" },
        { value: "jxl", display: "Jxl" }
      ],
      displayInSite: /hitomi.la\//
    },
    {
      key: "ehentaiTitlePrefer",
      typ: "select",
      options: [
        { value: "english", display: "English" },
        { value: "japanese", display: "Japanese" }
      ],
      displayInSite: /e[-x]hentai(.*)?.(org|onion)\/|imhentai.xxx/
    },
    {
      key: "filenameOrder",
      typ: "select",
      options: [
        { value: "auto", display: "Auto" },
        { value: "numbers", display: "Numbers" },
        { value: "original", display: "Original" },
        { value: "alphabetically", display: "Alphabetically" }
      ]
    }
  ];
  const DEFAULT_DISPLAY_TEXT = {
    entry: icons.moonViewCeremony,
    collapse: i18n.collapse.get(),
    fin: "FIN",
    autoPagePlay: i18n.autoPagePlay.get(),
    autoPagePause: i18n.autoPagePause.get(),
    config: i18n.config.get(),
    download: i18n.download.get(),
    chapters: i18n.chapters.get(),
    filter: i18n.filter.get(),
    pagination: "PAGE",
    continuous: "CONT",
    horizontal: "HORI"
  };
  function getDisplayText() {
    return { ...DEFAULT_DISPLAY_TEXT, ...conf.displayText };
  }

  function evLog(level, msg, ...info) {
    if (level === "debug" && !conf.debug) return;
    if (level === "error") {
      console.warn((/* @__PURE__ */ new Date()).toLocaleString(), "EHVP:" + msg, ...info);
    } else {
      console.info((/* @__PURE__ */ new Date()).toLocaleString(), "EHVP:" + msg, ...info);
    }
  }

  class EventManager {
    events;
    constructor() {
      this.events = /* @__PURE__ */ new Map();
    }
    emit(id, ...args) {
      if (!["imf-download-state-change", "imf-check-picked"].includes(id)) {
        evLog("debug", "event bus emitted: ", id);
      }
      const cbs = this.events.get(id);
      let ret;
      if (cbs) {
        cbs.forEach((cb) => ret = cb(...args));
      }
      return ret;
    }
    subscribe(id, cb) {
      evLog("info", "event bus subscribed: ", id);
      const cbs = this.events.get(id);
      if (cbs) {
        cbs.push(cb);
      } else {
        this.events.set(id, [cb]);
      }
    }
    reset() {
      this.events = /* @__PURE__ */ new Map();
    }
  }
  const EBUS = new EventManager();

  class Debouncer {
    tids;
    mode;
    lastExecTime;
    constructor(mode) {
      this.tids = {};
      this.lastExecTime = Date.now();
      this.mode = mode || "debounce";
    }
    addEvent(id, event, timeout) {
      if (this.mode === "throttle") {
        const now = Date.now();
        if (now - this.lastExecTime >= timeout) {
          this.lastExecTime = now;
          event();
        }
      } else if (this.mode === "debounce") {
        window.clearTimeout(this.tids[id]);
        this.tids[id] = window.setTimeout(event, timeout);
      }
    }
  }

  function xhrWapper(url, respType, cb, headers, timeout) {
    if (_GM_xmlhttpRequest === void 0) throw new Error("your userscript manager does not support Gm_xmlhttpRequest api");
    return _GM_xmlhttpRequest({
      method: "GET",
      url,
      timeout: timeout || 6e5,
      responseType: respType,
      nocache: false,
      revalidate: false,
      headers: {
        "Referer": window.location.href,
        "Cache-Control": "public, max-age=2592000, immutable",
        ...headers
      },
      ...cb
    })?.abort;
  }
  function simpleFetch(url, respType, headers) {
    return new Promise((resolve, reject) => {
      try {
        xhrWapper(url, respType, {
          onload: (response) => resolve(response.response),
          onerror: (error) => reject(error)
        }, headers ?? {}, 10 * 1e3);
      } catch (error) {
        reject(error);
      }
    });
  }
  async function batchFetch(requests, concurrency, respType = "text") {
    const results = new Array(requests.length);
    let i = 0;
    while (i < requests.length) {
      const batch = requests.slice(i, i + concurrency);
      const batchPromises = batch.map(
        (request, index) => window.fetch(request).then((resp) => {
          if (resp.ok) {
            try {
              switch (respType) {
                case "text":
                  return resp.text();
                case "json":
                  return resp.json();
                case "arraybuffer":
                  return resp.arrayBuffer();
              }
            } catch (error) {
              throw new Error(`failed to fetch ${request}: ${resp.status} ${error}`);
            }
          }
          throw new Error(`failed to fetch ${request}: ${resp.status} ${resp.statusText}`);
        }).then((raw) => results[index + i] = raw).catch((reason) => results[index + i] = new Error(reason))
      );
      await Promise.all(batchPromises);
      i += concurrency;
    }
    return results;
  }

  var FetchState = /* @__PURE__ */ ((FetchState2) => {
    FetchState2[FetchState2["FAILED"] = 0] = "FAILED";
    FetchState2[FetchState2["URL"] = 1] = "URL";
    FetchState2[FetchState2["DATA"] = 2] = "DATA";
    FetchState2[FetchState2["DONE"] = 3] = "DONE";
    return FetchState2;
  })(FetchState || {});
  class IMGFetcher {
    index;
    node;
    stage = 1 /* URL */;
    tryTimes = 0;
    lock = false;
    rendered = false;
    data;
    contentType;
    downloadState;
    timeoutId;
    matcher;
    chapterIndex;
    chapterID;
    randomID;
    failedReason;
    abortSignal = void 0;
    constructor(index, root, matcher, chapterIndex, chapterID) {
      this.index = index;
      this.node = root;
      this.node.onclick = (event) => {
        if (event.ctrlKey || event.metaKey) {
          EBUS.emit("add-cherry-pick-range", this.chapterIndex, this.index, true, event.shiftKey);
        } else if (event.altKey) {
          EBUS.emit("add-cherry-pick-range", this.chapterIndex, this.index, false, event.shiftKey);
        } else {
          EBUS.emit("imf-on-click", this);
        }
      };
      this.downloadState = { total: 100, loaded: 0, readyState: 0 };
      this.matcher = matcher;
      this.chapterIndex = chapterIndex;
      this.chapterID = chapterID;
      this.randomID = chapterIndex + Math.random().toString(16).slice(2) + this.node.href;
    }
    create() {
      const element = this.node.create();
      const noEle = document.createElement("div");
      noEle.classList.add("img-node-numtip");
      noEle.innerHTML = `<span>${this.index + 1}</span>`;
      element.firstElementChild.appendChild(noEle);
      return element;
    }
    // 刷新下载状态
    setDownloadState(newState) {
      this.downloadState = { ...this.downloadState, ...newState };
      this.node.progress(this.downloadState);
      EBUS.emit("imf-download-state-change", this);
    }
    async start() {
      if (this.lock) return;
      this.lock = true;
      try {
        this.node.changeStyle("fetching");
        await this.fetchImage();
        this.node.changeStyle("fetched");
        EBUS.emit("imf-on-finished", this.index, true, this);
        this.failedReason = void 0;
      } catch (error) {
        this.failedReason = error.toString();
        this.node.changeStyle("failed", this.failedReason);
        evLog("error", `IMG-FETCHER ERROR:`, error);
        this.stage = 0 /* FAILED */;
        EBUS.emit("imf-on-finished", this.index, false, this);
      } finally {
        this.lock = false;
      }
    }
    resetStage() {
      this.node.changeStyle("init");
      this.stage = 1 /* URL */;
    }
    async fetchImage() {
      const fetchMachine = async () => {
        try {
          switch (this.stage) {
            case 0 /* FAILED */:
            case 1 /* URL */:
              const meta = await this.fetchOriginMeta();
              this.node.originSrc = meta.url;
              this.node.updateTagByExtension();
              if (meta.title) {
                this.node.title = meta.title;
                if (this.node.imgElement) {
                  this.node.imgElement.title = meta.title;
                }
              }
              this.node.href = meta.href || this.node.href;
              this.stage = 2 /* DATA */;
              return fetchMachine();
            case 2 /* DATA */:
              const ret = await this.fetchImageData();
              [this.data, this.contentType] = ret;
              [this.data, this.contentType] = await this.matcher.processData(this.data, this.contentType, this.node);
              this.node.updateTagByPrefix("mime:" + (this.contentType ?? "unknown"));
              if (this.contentType.startsWith("text")) {
                const str = new TextDecoder().decode(this.data);
                evLog("error", "unexpect content:\n", str);
                throw new Error(`expect image data, fetched wrong type: ${this.contentType}, the content is showing up in console(F12 open it).`);
              }
              this.node.blobSrc = transient.imgSrcCSP ? this.node.originSrc : URL.createObjectURL(new Blob([this.data], { type: this.contentType }));
              this.node.mimeType = this.contentType;
              this.node.render(
                (reason) => {
                  evLog("error", "render image failed, " + reason);
                  this.rendered = false;
                },
                () => EBUS.emit("imf-resize", this)
              );
              this.stage = 3 /* DONE */;
            case 3 /* DONE */:
              return null;
          }
        } catch (error) {
          this.stage = 0 /* FAILED */;
          return error;
        }
      };
      this.tryTimes = 0;
      let err;
      while (this.tryTimes < 3) {
        err = await fetchMachine();
        if (err === null) return;
        this.tryTimes++;
        evLog("error", `fetch image error, try times: ${this.tryTimes}, error:`, err);
      }
      throw err;
    }
    async fetchOriginMeta() {
      return await this.matcher.fetchOriginMeta(this.node, this.tryTimes > 0 || this.stage === 0 /* FAILED */, this.chapterID);
    }
    async fetchImageData() {
      const data = await this.fetchBigImage();
      if (data == null) {
        throw new Error(`fetch image data is empty, image url:${this.node.originSrc}`);
      }
      return data.arrayBuffer().then((buffer) => [new Uint8Array(buffer), data.type]);
    }
    render(force) {
      const picked = EBUS.emit("imf-check-picked", this.chapterIndex, this.index) ?? this.node.picked;
      const shouldChangeStyle = picked !== this.node.picked;
      this.node.picked = picked;
      if (force) this.rendered = false;
      if (!this.rendered) {
        this.rendered = true;
        this.node.render(
          (reason) => {
            evLog("error", "render image failed, " + reason);
            this.rendered = false;
          },
          () => EBUS.emit("imf-resize", this),
          force
        );
        this.node.changeStyle(this.stage === 3 /* DONE */ ? "fetched" : void 0, this.failedReason);
      } else if (shouldChangeStyle) {
        let status;
        switch (this.stage) {
          case 0 /* FAILED */:
            status = "failed";
            break;
          case 1 /* URL */:
            status = "init";
            break;
          case 2 /* DATA */:
            status = "fetching";
            break;
          case 3 /* DONE */:
            status = "fetched";
            break;
        }
        this.node.changeStyle(status, this.failedReason);
      }
    }
    isRender() {
      return this.rendered;
    }
    unrender() {
      if (!this.rendered) return;
      this.rendered = false;
      this.node.unrender();
      this.node.changeStyle("init");
    }
    ratio() {
      return this.node.ratio();
    }
    async fetchBigImage() {
      if (this.node.originSrc?.startsWith("blob:")) {
        return await fetch(this.node.originSrc).then((resp) => resp.blob());
      }
      const imgFetcher = this;
      return new Promise(async (resolve, reject) => {
        const debouncer = new Debouncer();
        const timeout = () => {
          debouncer.addEvent("XHR_TIMEOUT", () => {
            this.abort();
            reject(new Error("timeout"));
          }, conf.timeout * 1e3);
        };
        try {
          this.abortSignal = xhrWapper(imgFetcher.node.originSrc, "blob", {
            onload: function(response) {
              const data = response.response;
              try {
                imgFetcher.setDownloadState({ readyState: response.readyState });
              } catch (error) {
                evLog("error", "warn: fetch big image data onload setDownloadState error:", error);
              }
              imgFetcher.abortSignal = void 0;
              resolve(data);
            },
            onerror: function(response) {
              imgFetcher.abortSignal = void 0;
              if (response.status === 0 && response.error?.includes("URL is not permitted")) {
                const domain = response.error.match(/(https?:\/\/.*?)\/.*/)?.[1] ?? "";
                reject(new Error(i18n.failFetchReason1.get().replace("{{domain}}", domain)));
              } else {
                reject(new Error(`response status:${response.status}, error:${response.error}, response:${response.response}`));
              }
            },
            onprogress: function(response) {
              imgFetcher.setDownloadState({ total: response.total, loaded: response.loaded, readyState: response.readyState });
              timeout();
            },
            onloadstart: function() {
              imgFetcher.setDownloadState(imgFetcher.downloadState);
            }
          }, this.matcher.headers());
          timeout();
        } catch (error) {
          reject(error);
        }
      });
    }
    abort() {
      this.abortSignal?.();
      this.abortSignal = void 0;
    }
  }

  class Crc32 {
    crc = -1;
    table = this.makeTable();
    makeTable() {
      let i;
      let j;
      let t;
      const table = [];
      for (i = 0; i < 256; i++) {
        t = i;
        for (j = 0; j < 8; j++) {
          t = t & 1 ? t >>> 1 ^ 3988292384 : t >>> 1;
        }
        table[i] = t;
      }
      return table;
    }
    append(data) {
      let crc = this.crc | 0;
      const table = this.table;
      for (let offset = 0, len = data.length | 0; offset < len; offset++) {
        crc = crc >>> 8 ^ table[(crc ^ data[offset]) & 255];
      }
      this.crc = crc;
    }
    get() {
      return ~this.crc;
    }
  }
  class ZipObject {
    level;
    nameBuf;
    comment;
    header;
    offset;
    directory;
    file;
    crc;
    compressedLength;
    uncompressedLength;
    volumeNo;
    constructor(file, volumeNo) {
      this.level = 0;
      const encoder = new TextEncoder();
      this.nameBuf = encoder.encode(file.name.trim());
      this.comment = encoder.encode("");
      this.header = new DataHelper(26);
      this.offset = 0;
      this.directory = false;
      this.file = file;
      this.crc = new Crc32();
      this.compressedLength = 0;
      this.uncompressedLength = 0;
      this.volumeNo = volumeNo;
    }
  }
  class DataHelper {
    array;
    view;
    constructor(byteLength) {
      const uint8 = new Uint8Array(byteLength);
      this.array = uint8;
      this.view = new DataView(uint8.buffer);
    }
  }
  class Zip {
    // default 1.5GB
    volumeSize = 1610612736;
    accumulatedSize = 0;
    volumes = 1;
    currVolumeNo = -1;
    files = [];
    currIndex = -1;
    offset = 0;
    offsetInVolume = 0;
    curr;
    date;
    writer;
    close = false;
    constructor(settings) {
      if (settings?.volumeSize) {
        this.volumeSize = settings.volumeSize;
      }
      this.date = new Date(Date.now());
      this.writer = async () => {
      };
    }
    setWriter(writer) {
      this.writer = writer;
    }
    add(file) {
      const fileSize = file.size();
      this.accumulatedSize += fileSize;
      if (this.accumulatedSize > this.volumeSize) {
        this.volumes++;
        this.accumulatedSize = fileSize;
      }
      this.files.push(new ZipObject(file, this.volumes - 1));
    }
    async next() {
      this.currIndex++;
      this.curr = this.files[this.currIndex];
      if (this.curr) {
        if (this.curr.volumeNo > this.currVolumeNo) {
          this.currIndex--;
          this.offsetInVolume = 0;
          return true;
        }
        this.curr.offset = this.offsetInVolume;
        await this.writeHeader();
        await this.writeContent();
        await this.writeFooter();
        this.offset += this.offsetInVolume - this.curr.offset;
      } else if (!this.close) {
        this.close = true;
        await this.closeZip();
      } else {
        return true;
      }
      return false;
    }
    async writeHeader() {
      if (!this.curr) return;
      const curr = this.curr;
      const data = new DataHelper(30 + curr.nameBuf.length);
      const header = curr.header;
      if (curr.level !== 0 && !curr.directory) {
        header.view.setUint16(4, 2048);
      }
      header.view.setUint32(0, 335546376);
      header.view.setUint16(6, (this.date.getHours() << 6 | this.date.getMinutes()) << 5 | this.date.getSeconds() / 2, true);
      header.view.setUint16(8, (this.date.getFullYear() - 1980 << 4 | this.date.getMonth() + 1) << 5 | this.date.getDate(), true);
      header.view.setUint16(22, curr.nameBuf.length, true);
      data.view.setUint32(0, 1347093252);
      data.array.set(header.array, 4);
      data.array.set(curr.nameBuf, 30);
      this.offsetInVolume += data.array.length;
      await this.writer(data.array);
    }
    async writeContent() {
      const curr = this.curr;
      const reader = (await curr.file.stream()).getReader();
      const writer = this.writer;
      async function pump() {
        const chunk = await reader.read();
        if (chunk.done) {
          return;
        }
        const data = chunk.value;
        curr.crc.append(data);
        curr.uncompressedLength += data.length;
        curr.compressedLength += data.length;
        writer(data);
        return await pump();
      }
      await pump();
    }
    async writeFooter() {
      if (!this.curr) return;
      const curr = this.curr;
      const footer = new DataHelper(16);
      footer.view.setUint32(0, 1347094280);
      if (curr.crc) {
        curr.header.view.setUint32(10, curr.crc.get(), true);
        curr.header.view.setUint32(14, curr.compressedLength, true);
        curr.header.view.setUint32(18, curr.uncompressedLength, true);
        footer.view.setUint32(4, curr.crc.get(), true);
        footer.view.setUint32(8, curr.compressedLength, true);
        footer.view.setUint32(12, curr.uncompressedLength, true);
      }
      await this.writer(footer.array);
      this.offsetInVolume += curr.compressedLength + 16;
      if (curr.compressedLength !== curr.file.size()) {
        evLog("error", "WRAN: read length:", curr.compressedLength, " origin size:", curr.file.size(), ", title: ", curr.file.name);
      }
    }
    async closeZip() {
      const fileCount = this.files.length;
      let centralDirLength = 0;
      let idx = 0;
      for (idx = 0; idx < fileCount; idx++) {
        const file = this.files[idx];
        centralDirLength += 46 + file.nameBuf.length + file.comment.length;
      }
      const data = new DataHelper(centralDirLength + 22);
      let dataOffset = 0;
      for (idx = 0; idx < fileCount; idx++) {
        const file = this.files[idx];
        data.view.setUint32(dataOffset, 1347092738);
        data.view.setUint16(dataOffset + 4, 5120);
        data.array.set(file.header.array, dataOffset + 6);
        data.view.setUint16(dataOffset + 32, file.comment.length, true);
        data.view.setUint16(dataOffset + 34, file.volumeNo, true);
        data.view.setUint32(dataOffset + 42, file.offset, true);
        data.array.set(file.nameBuf, dataOffset + 46);
        data.array.set(file.comment, dataOffset + 46 + file.nameBuf.length);
        dataOffset += 46 + file.nameBuf.length + file.comment.length;
      }
      data.view.setUint32(dataOffset, 1347093766);
      data.view.setUint16(dataOffset + 4, this.currVolumeNo, true);
      data.view.setUint16(dataOffset + 6, this.currVolumeNo, true);
      data.view.setUint16(dataOffset + 8, fileCount, true);
      data.view.setUint16(dataOffset + 10, fileCount, true);
      data.view.setUint32(dataOffset + 12, centralDirLength, true);
      data.view.setUint32(dataOffset + 16, this.offsetInVolume, true);
      await this.writer(data.array);
    }
    nextReadableStream() {
      this.currVolumeNo++;
      if (this.currVolumeNo >= this.volumes) {
        return;
      }
      const zip = this;
      return new ReadableStream({
        start(controller) {
          zip.setWriter(async (chunk) => controller.enqueue(chunk));
        },
        async pull(controller) {
          await zip.next().then((done) => done && controller.close());
        }
      });
    }
  }

  class DownloaderCanvas {
    canvas;
    mousemoveState;
    ctx;
    queue;
    rectSize;
    rectGap;
    columns;
    padding;
    scrollTop;
    scrollSize;
    debouncer;
    onClick;
    cherryPick;
    constructor(canvas, queue, cherryPick) {
      this.queue = queue;
      this.cherryPick = cherryPick;
      if (!canvas) {
        throw new Error("canvas not found");
      }
      this.canvas = canvas;
      this.canvas.addEventListener(
        "wheel",
        (event) => this.onwheel(event.deltaY)
      );
      this.mousemoveState = { x: 0, y: 0 };
      this.canvas.addEventListener("mousemove", (event) => {
        this.mousemoveState = { x: event.offsetX, y: event.offsetY };
        this.drawDebouce();
      });
      this.canvas.addEventListener("click", (event) => {
        this.mousemoveState = { x: event.offsetX, y: event.offsetY };
        const index = this.computeDrawList()?.find(
          (state) => state.selected
        )?.index;
        if (index !== void 0) {
          EBUS.emit("downloader-canvas-on-click", index);
        }
      });
      this.ctx = this.canvas.getContext("2d");
      this.rectSize = 12;
      this.rectGap = 6;
      this.columns = 15;
      this.padding = 7;
      this.scrollTop = 0;
      this.scrollSize = 10;
      this.debouncer = new Debouncer();
      EBUS.subscribe("imf-download-state-change", () => this.drawDebouce());
      EBUS.subscribe("downloader-canvas-resize", () => this.resize());
    }
    resize(parent) {
      parent = parent || this.canvas.parentElement;
      this.canvas.width = Math.floor(parent.offsetWidth);
      this.canvas.height = Math.floor(parent.offsetHeight);
      this.columns = Math.ceil((this.canvas.width - this.padding * 2 - this.rectGap) / (this.rectSize + this.rectGap));
      this.draw();
    }
    onwheel(deltaY) {
      const [_, h] = this.getWH();
      const clientHeight = this.computeClientHeight();
      if (clientHeight > h) {
        deltaY = deltaY >> 1;
        this.scrollTop += deltaY;
        if (this.scrollTop < 0) this.scrollTop = 0;
        if (this.scrollTop + h > clientHeight + 20)
          this.scrollTop = clientHeight - h + 20;
        this.draw();
      }
    }
    drawDebouce() {
      this.debouncer.addEvent("DOWNLOADER-DRAW", () => this.draw(), 20);
    }
    computeDrawList() {
      const list = [];
      const picked = this.cherryPick();
      const [_, h] = this.getWH();
      const startX = this.computeStartX();
      const startY = -this.scrollTop + this.padding;
      for (let i = 0, row = -1; i < this.queue.length; i++) {
        const currCol = i % this.columns;
        if (currCol == 0) {
          row++;
        }
        const atX = startX + (this.rectSize + this.rectGap) * currCol;
        const atY = startY + (this.rectSize + this.rectGap) * row;
        if (atY + this.rectSize < 0) {
          continue;
        }
        if (atY > h) {
          break;
        }
        list.push({
          index: i,
          x: atX,
          y: atY,
          selected: this.isSelected(atX, atY),
          disabled: !picked.picked(i)
        });
      }
      return list;
    }
    // this function should be called by drawDebouce
    draw() {
      const [w, h] = this.getWH();
      this.ctx.clearRect(0, 0, w, h);
      const drawList = this.computeDrawList();
      for (const node of drawList) {
        this.drawSmallRect(
          node.x,
          node.y,
          this.queue[node.index],
          node.index === this.queue.currIndex,
          node.selected,
          node.disabled
        );
      }
    }
    computeClientHeight() {
      return Math.ceil(this.queue.length / this.columns) * (this.rectSize + this.rectGap) - this.rectGap;
    }
    scrollTo(index) {
      const clientHeight = this.computeClientHeight();
      const [_, h] = this.getWH();
      if (clientHeight <= h) {
        return;
      }
      const rowNo = Math.ceil((index + 1) / this.columns);
      const offsetY = (rowNo - 1) * (this.rectSize + this.rectGap);
      if (offsetY > h) {
        this.scrollTop = offsetY + this.rectSize - h;
        const maxScrollTop = clientHeight - h + 20;
        if (this.scrollTop + 20 <= maxScrollTop) {
          this.scrollTop += 20;
        }
      }
    }
    isSelected(atX, atY) {
      return this.mousemoveState.x - atX >= 0 && this.mousemoveState.x - atX <= this.rectSize && this.mousemoveState.y - atY >= 0 && this.mousemoveState.y - atY <= this.rectSize;
    }
    computeStartX() {
      const [w, _] = this.getWH();
      const drawW = (this.rectSize + this.rectGap) * this.columns - this.rectGap;
      const startX = w - drawW >> 1;
      return startX;
    }
    drawSmallRect(x, y, imgFetcher, isCurr, isSelected, disabled) {
      if (disabled) {
        this.ctx.fillStyle = "rgba(20, 20, 20, 1)";
      } else {
        switch (imgFetcher.stage) {
          case FetchState.FAILED:
            this.ctx.fillStyle = "rgba(250, 50, 20, 0.9)";
            break;
          case FetchState.URL:
            this.ctx.fillStyle = "rgba(200, 200, 200, 0.6)";
            break;
          case FetchState.DATA:
            const percent = imgFetcher.downloadState.loaded / imgFetcher.downloadState.total;
            this.ctx.fillStyle = `rgba(${200 + Math.ceil((110 - 200) * percent)}, ${200 + Math.ceil((200 - 200) * percent)}, ${200 + Math.ceil((120 - 200) * percent)}, ${0.6 + Math.ceil((1 - 0.6) * percent)})`;
            break;
          case FetchState.DONE:
            this.ctx.fillStyle = "rgb(110, 200, 120)";
            break;
        }
      }
      this.ctx.fillRect(x, y, this.rectSize, this.rectSize);
      this.ctx.shadowColor = "#d53";
      if (isSelected) {
        this.ctx.strokeStyle = "rgb(60, 20, 200)";
        this.ctx.lineWidth = 2;
      } else if (isCurr) {
        this.ctx.strokeStyle = "rgb(255, 60, 20)";
        this.ctx.lineWidth = 2;
      } else {
        this.ctx.strokeStyle = "rgb(90, 90, 90)";
        this.ctx.lineWidth = 1;
      }
      this.ctx.strokeRect(x, y, this.rectSize, this.rectSize);
    }
    getWH() {
      return [this.canvas.width, this.canvas.height];
    }
  }

  const FILENAME_INVALIDCHAR = /[\\/:*?"<>|\n\t]/g;
  class Downloader {
    meta;
    title;
    downloading;
    queue;
    idleLoader;
    pageFetcher;
    done = false;
    selectedChapters = [];
    filenames = /* @__PURE__ */ new Set();
    panel;
    canvas;
    cherryPicks = [new CherryPick()];
    constructor(HTML, queue, idleLoader, pageFetcher, matcher) {
      this.panel = HTML.downloader;
      this.panel.initTabs();
      this.initEvents(this.panel);
      this.panel.initCherryPick(
        (chapterIndex, range) => {
          if (this.cherryPicks[chapterIndex] === void 0) {
            this.cherryPicks[chapterIndex] = new CherryPick();
          }
          const ret = this.cherryPicks[chapterIndex].add(range);
          EBUS.emit("cherry-pick-changed", chapterIndex, this.cherryPicks[chapterIndex]);
          return ret;
        },
        (chapterIndex, id) => {
          if (this.cherryPicks[chapterIndex] === void 0) {
            this.cherryPicks[chapterIndex] = new CherryPick();
          }
          const ret = this.cherryPicks[chapterIndex].remove(id);
          EBUS.emit("cherry-pick-changed", chapterIndex, this.cherryPicks[chapterIndex]);
          return ret;
        },
        (chapterIndex) => {
          if (this.cherryPicks[chapterIndex] === void 0) {
            this.cherryPicks[chapterIndex] = new CherryPick();
          }
          this.cherryPicks[chapterIndex].reset();
          EBUS.emit("cherry-pick-changed", chapterIndex, this.cherryPicks[chapterIndex]);
        },
        (chapterIndex) => {
          if (this.cherryPicks[chapterIndex] === void 0) {
            this.cherryPicks[chapterIndex] = new CherryPick();
          }
          return this.cherryPicks[chapterIndex].values;
        }
      );
      this.panel.initNotice([
        {
          btn: i18n.resetDownloaded.get(),
          cb: () => {
            if (confirm(i18n.resetDownloadedConfirm.get())) this.queue.forEach((imf) => imf.stage === FetchState.DONE && imf.resetStage());
          }
        },
        {
          btn: i18n.resetFailed.get(),
          cb: () => {
            this.queue.forEach((imf) => imf.stage === FetchState.FAILED && imf.resetStage());
            if (!this.downloading) this.idleLoader.abort(0, 100);
          }
        }
      ]);
      this.queue = queue;
      this.queue.cherryPick = () => this.cherryPicks[this.queue.chapterIndex] || new CherryPick();
      this.idleLoader = idleLoader;
      this.idleLoader.cherryPick = () => this.cherryPicks[this.queue.chapterIndex] || new CherryPick();
      this.canvas = new DownloaderCanvas(this.panel.canvas, queue, () => this.cherryPicks[this.queue.chapterIndex] || new CherryPick());
      this.pageFetcher = pageFetcher;
      this.meta = (chapter) => matcher.galleryMeta(chapter);
      this.title = (chapters) => matcher.title(chapters);
      this.downloading = false;
      this.queue.downloading = () => this.downloading;
      EBUS.subscribe("ifq-on-finished-report", (_, queue2) => {
        if (queue2.isFinished()) {
          const sel = this.selectedChapters.find((sel2) => sel2.index === queue2.chapterIndex);
          if (sel) {
            sel.done = true;
            sel.resolve(true);
          }
          if (!this.downloading && !this.done) {
            this.panel.noticeableBTN();
          }
        }
      });
      EBUS.subscribe("imf-check-picked", (chapterIndex, index) => this.cherryPicks[chapterIndex]?.picked(index));
    }
    initEvents(panel) {
      panel.forceBTN.addEventListener("click", () => this.download(this.pageFetcher.chapters));
      panel.startBTN.addEventListener("click", () => {
        if (this.downloading) {
          this.abort("downloadStart");
        } else {
          this.start();
        }
      });
    }
    needNumberTitle(queue) {
      if (conf.filenameOrder === "numbers") return true;
      if (conf.filenameOrder === "original") return false;
      let comparer;
      if (conf.filenameOrder === "alphabetically") {
        comparer = (a, before) => a < before;
      } else {
        comparer = (a, before) => a.localeCompare(before, void 0, { numeric: true, sensitivity: "base" }) < 0;
      }
      let lastTitle = "";
      for (const fetcher of queue) {
        if (lastTitle && comparer(fetcher.node.title, lastTitle)) {
          return true;
        }
        lastTitle = fetcher.node.title;
      }
      return false;
    }
    // check > start > download
    check() {
      if (this.downloading) return;
      setTimeout(() => EBUS.emit("downloader-canvas-resize"), 110);
      this.panel.createChapterSelectList(this.pageFetcher.chapters, this.selectedChapters);
      if (this.queue.length > 0) {
        this.panel.switchTab("status");
      } else if (this.pageFetcher.chapters.length > 1) {
        this.panel.switchTab("chapters");
      }
    }
    checkSelectedChapters() {
      this.selectedChapters.length = 0;
      const idSet = this.panel.selectedChapters();
      if (idSet.size === 0) {
        this.selectedChapters.push({ index: this.pageFetcher.chapterIndex, done: false, ...promiseWithResolveAndReject() });
      } else {
        this.pageFetcher.chapters.forEach((c, i) => idSet.has(c.id) && this.selectedChapters.push({ index: i, done: false, ...promiseWithResolveAndReject() }));
      }
      return this.selectedChapters;
    }
    async start() {
      if (this.downloading) return;
      this.panel.flushUI("downloading");
      this.downloading = true;
      this.idleLoader.autoLoad = true;
      this.checkSelectedChapters();
      try {
        for (const sel of this.selectedChapters) {
          if (!this.downloading) return;
          await this.pageFetcher.restoreChapter(sel.index);
          this.queue.forEach((imf) => imf.stage === FetchState.FAILED && imf.resetStage());
          if (this.queue.isFinished()) {
            sel.done = true;
            sel.resolve(true);
          } else {
            this.idleLoader.processingIndexList = this.queue.map((imgFetcher, index) => !imgFetcher.lock && imgFetcher.stage === FetchState.URL ? index : -1).filter((index) => index >= 0).splice(0, conf.downloadThreads);
            this.idleLoader.onFailed(() => sel.reject("download failed or canceled"));
            this.idleLoader.checkProcessingIndex();
            this.idleLoader.start();
          }
          await sel.promise;
        }
        if (this.downloading) await this.download(this.selectedChapters.filter((sel) => sel.done).map((sel) => this.pageFetcher.chapters[sel.index]));
      } catch (error) {
        if ("abort" === error) return;
        this.abort("downloadFailed");
        evLog("error", "download failed: ", error);
      } finally {
        this.downloading = false;
      }
    }
    mapToFileLikes(chapter, picked, directory) {
      if (!chapter || chapter.filteredQueue.length === 0) return [];
      let checkTitle;
      const needNumberTitle = this.needNumberTitle(chapter.filteredQueue);
      if (needNumberTitle) {
        const digits = chapter.filteredQueue.length.toString().length;
        if (conf.filenameOrder === "numbers") {
          checkTitle = (title, index) => `${index + 1}`.padStart(digits, "0") + "." + title.split(".").pop();
        } else {
          checkTitle = (title, index) => `${index + 1}`.padStart(digits, "0") + "_" + title.replaceAll(FILENAME_INVALIDCHAR, "_");
        }
      } else {
        this.filenames.clear();
        checkTitle = (title) => deduplicate(this.filenames, title.replaceAll(FILENAME_INVALIDCHAR, "_"));
      }
      const ret = chapter.filteredQueue.filter((imf, i) => picked.picked(i) && imf.stage === FetchState.DONE && imf.data).map((imf, index) => {
        return {
          stream: () => Promise.resolve(uint8ArrayToReadableStream(imf.data)),
          size: () => imf.data.byteLength,
          name: directory + checkTitle(imf.node.title, index)
        };
      });
      const meta = new TextEncoder().encode(JSON.stringify(this.meta(chapter), null, 2));
      ret.push({
        stream: () => Promise.resolve(uint8ArrayToReadableStream(meta)),
        size: () => meta.byteLength,
        name: directory + "meta.json"
      });
      return ret;
    }
    async download(chapters) {
      try {
        const archiveName = this.title(chapters).replaceAll(FILENAME_INVALIDCHAR, "_");
        const separator = navigator.userAgent.indexOf("Win") !== -1 ? "\\" : "/";
        const singleChapter = chapters.length === 1;
        this.panel.flushUI("packaging");
        const dirnameSet = /* @__PURE__ */ new Set();
        const files = [];
        for (let i = 0; i < chapters.length; i++) {
          const chapter = chapters[i];
          const picked = this.cherryPicks[i] || new CherryPick();
          let directory = (() => {
            if (singleChapter) return "";
            if (chapter.title instanceof Array) {
              return chapter.title.join("_").replaceAll(FILENAME_INVALIDCHAR, "_").replaceAll(/\s+/g, " ") + separator;
            } else {
              return chapter.title.replaceAll(FILENAME_INVALIDCHAR, "_").replaceAll(/\s+/g, " ") + separator;
            }
          })();
          directory = shrinkFilename(directory, 200);
          directory = deduplicate(dirnameSet, directory);
          const ret = this.mapToFileLikes(chapter, picked, directory);
          files.push(...ret);
        }
        const zip = new Zip({ volumeSize: 1024 * 1024 * (conf.archiveVolumeSize || 1500) });
        files.forEach((file) => zip.add(file));
        const save = async () => {
          let readable;
          while (readable = zip.nextReadableStream()) {
            const blob = await new Response(readable).blob();
            const ext = zip.currVolumeNo === zip.volumes - 1 ? "zip" : "z" + (zip.currVolumeNo + 1).toString().padStart(2, "0");
            fileSaver.saveAs(blob, `${archiveName}.${ext}`);
          }
        };
        await save();
        this.done = true;
      } catch (error) {
        let reason = error.toString();
        if (reason.includes(`autoAllocateChunkSize`)) {
          reason = "Create Zip archive prevented by The content security policy of this page. Please refer to the CONF > Help for a solution.";
        }
        EBUS.emit("notify-message", "error", `packaging failed, ${reason}`);
        throw error;
      } finally {
        this.abort(this.done ? "downloaded" : "downloadFailed");
      }
    }
    abort(stage) {
      this.downloading = false;
      this.panel.abort(stage);
      this.idleLoader.abort();
      this.selectedChapters.forEach((sel) => sel.reject("abort"));
    }
  }
  function shrinkFilename(str, limit) {
    const encoder = new TextEncoder();
    const byteLen = (s) => encoder.encode(s).byteLength;
    const bLen = byteLen(str);
    if (bLen <= limit) return str;
    const sliceRange = [str.length >> 1, (str.length >> 1) + 1];
    let left = true;
    while (true) {
      if (bLen - byteLen(str.slice(...sliceRange)) <= limit) {
        return str.slice(0, sliceRange[0]) + ",,," + str.slice(sliceRange[1]);
      }
      if (left && sliceRange[0] > 3) {
        sliceRange[0] -= 1;
        left = false;
        continue;
      }
      if (sliceRange[1] < str.length - 3) {
        sliceRange[1] += 1;
        left = true;
        continue;
      }
      break;
    }
    return str.slice(0, limit);
  }
  function deduplicate(set, title) {
    let newTitle = title;
    if (set.has(newTitle)) {
      const splits = newTitle.split(".");
      const ext = splits.pop();
      const prefix = splits.join(".");
      const num = parseInt(prefix.match(/_(\d+)$/)?.[1] || "");
      if (isNaN(num)) {
        newTitle = `${prefix}_1.${ext}`;
      } else {
        newTitle = `${prefix.replace(/\d+$/, (num + 1).toString())}.${ext}`;
      }
      return deduplicate(set, newTitle);
    } else {
      set.add(newTitle);
      return newTitle;
    }
  }
  function uint8ArrayToReadableStream(arr) {
    return new ReadableStream({
      pull(controller) {
        controller.enqueue(arr);
        controller.close();
      }
    });
  }
  function promiseWithResolveAndReject() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { resolve, reject, promise };
  }
  class CherryPick {
    values = [];
    positive = false;
    // if values has positive picked, ignore exclude
    sieve = [];
    reset() {
      this.values = [];
      this.positive = false;
      this.sieve = [];
    }
    add(range) {
      if (this.values.length === 0) {
        this.positive = range.positive;
        this.values.push(range);
        this.setSieve(range);
        return this.values;
      }
      const exists = this.values.find((v) => v.id === range.id);
      if (exists) return null;
      const newR = range.range();
      const remIdSet = /* @__PURE__ */ new Set();
      const addIdSet = /* @__PURE__ */ new Set();
      const addList = [];
      let equalsOld = false;
      for (let i = 0; i < this.values.length; i++) {
        const old = this.values[i];
        const oldR = old.range();
        if (newR[0] >= oldR[0] && newR[1] <= oldR[1]) {
          if (range.positive !== this.positive) {
            remIdSet.add(old.id);
            if (oldR[0] < newR[0]) {
              addList.push(new CherryPickRange([oldR[0], newR[0] - 1], old.positive));
            }
            if (oldR[1] > newR[1]) {
              addList.push(new CherryPickRange([newR[1] + 1, oldR[1]], old.positive));
            }
            equalsOld = newR[0] === newR[1] && newR[0] === oldR[0] && newR[1] === oldR[1];
          }
          break;
        }
        if (newR[0] <= oldR[0] && newR[1] >= oldR[1]) {
          remIdSet.add(old.id);
        } else if (newR[0] <= oldR[0] && newR[1] >= oldR[0] && newR[1] <= oldR[1]) {
          old.reset([newR[1] + 1, oldR[1]]);
        } else if (newR[0] >= oldR[0] && newR[0] <= oldR[1] && newR[1] >= oldR[1]) {
          old.reset([oldR[0], newR[0] - 1]);
        }
        if (range.positive === this.positive) {
          if (!addIdSet.has(range.id)) {
            addIdSet.add(range.id);
            addList.push(range);
          }
        }
      }
      if (remIdSet.size > 0) {
        this.values = this.values.filter((v) => !remIdSet.has(v.id));
      }
      if (addList.length > 0) {
        this.values.push(...addList);
      }
      if (this.values.length === 0) {
        this.reset();
        if (equalsOld) {
          return this.values;
        }
        this.positive = range.positive;
        this.values.push(range);
      } else {
        this.concat();
      }
      this.setSieve(range);
      return this.values;
    }
    setSieve(range) {
      const newR = range.range();
      for (let i = newR[0] - 1; i < newR[1]; i++) {
        this.sieve[i] = range.positive === this.positive;
      }
    }
    concat() {
      if (this.values.length < 2) return;
      this.values.sort((v1, v2) => v1.range()[0] - v2.range()[0]);
      let i = 0, j = 1;
      const skip = [];
      while (i < this.values.length && j < this.values.length) {
        const r1 = this.values[i];
        const r2 = this.values[j];
        const r1v = r1.range();
        const r2v = r2.range();
        if (r1v[1] + 1 === r2v[0]) {
          r1.reset([r1v[0], r2v[1]]);
          skip.push(j);
          j++;
        } else {
          do {
            i++;
          } while (skip.includes(i));
          j = i + 1;
        }
      }
      this.values = this.values.filter((_, i2) => !skip.includes(i2));
    }
    remove(id) {
      const index = this.values.findIndex((v) => v.id === id);
      if (index === -1) return;
      const range = this.values.splice(index, 1)[0];
      const r = range.range();
      for (let i = r[0] - 1; i < r[1]; i++) {
        this.sieve[i] = false;
      }
      if (this.values.length === 0) {
        this.sieve = [];
        this.positive = false;
      }
    }
    picked(index) {
      return Boolean(this.positive ? this.sieve[index] : !this.sieve[index]);
    }
  }
  class CherryPickRange {
    value;
    positive;
    id;
    constructor(value, positive) {
      this.positive = positive;
      this.value = value.sort((a, b) => a - b);
      this.id = CherryPickRange.rangeToString(this.value, this.positive);
    }
    toString() {
      return CherryPickRange.rangeToString(this.value, this.positive);
    }
    reset(newRange) {
      this.value = newRange.sort((a, b) => a - b);
      this.id = CherryPickRange.rangeToString(this.value, this.positive);
    }
    range() {
      return this.value;
    }
    static rangeToString(value, positive) {
      let str = "";
      if (value[0] === value[1]) {
        str = value[0].toString();
      } else {
        str = value.map((v) => v.toString()).join("-");
      }
      return positive ? str : "!" + str;
    }
    static from(value) {
      value = value?.trim();
      if (!value) return null;
      value = value.replace(/!+/, "!");
      const exclude = value.startsWith("!");
      if (/^!?\d+$/.test(value)) {
        const index = parseInt(value.replace("!", ""));
        return new CherryPickRange([index, index], !exclude);
      }
      if (/^!?\d+-\d+$/.test(value)) {
        const splits = value.replace("!", "").split("-").map((v) => parseInt(v));
        return new CherryPickRange([splits[0], splits[1]], !exclude);
      }
      return null;
    }
  }

  class IMGFetcherQueue extends Array {
    executableQueue;
    currIndex;
    finishedIndex = /* @__PURE__ */ new Set();
    debouncer;
    downloading;
    dataSize = 0;
    chapterIndex = 0;
    cherryPick;
    clear() {
      this.length = 0;
      this.executableQueue = [];
      this.currIndex = 0;
      this.finishedIndex.clear();
    }
    restore(chapterIndex, imfs) {
      this.clear();
      this.chapterIndex = chapterIndex;
      imfs.forEach((imf, i) => imf.stage === FetchState.DONE && this.finishedIndex.add(i));
      this.push(...imfs);
    }
    static newQueue() {
      const queue = new IMGFetcherQueue();
      EBUS.subscribe("imf-on-finished", (index, success, imf) => queue.chapterIndex === imf.chapterIndex && queue.finishedReport(index, success, imf));
      EBUS.subscribe("ifq-do", (index, imf, oriented) => {
        if (imf.chapterIndex !== queue.chapterIndex) return;
        queue.do(index, oriented);
      });
      EBUS.subscribe("pf-change-chapter", () => queue.forEach((imf) => imf.unrender()));
      EBUS.subscribe("add-cherry-pick-range", (chIndex, index, positive, _shiftKey) => {
        if (chIndex !== queue.chapterIndex) return;
        if (positive) return;
        if (queue[index]?.stage === FetchState.DATA) {
          queue[index].abort();
          queue[index].stage = FetchState.URL;
        }
      });
      return queue;
    }
    constructor() {
      super();
      this.executableQueue = [];
      this.currIndex = 0;
      this.debouncer = new Debouncer();
    }
    isFinished() {
      const picked = this.cherryPick?.(this.chapterIndex);
      if (picked && picked.values.length > 0) {
        for (let index = 0; index < this.length; index++) {
          if (picked.picked(index) && !this.finishedIndex.has(index)) {
            return false;
          }
        }
        return true;
      } else {
        return this.finishedIndex.size === this.length;
      }
    }
    do(start, oriented) {
      oriented = oriented || "next";
      this.currIndex = this.fixIndex(start);
      EBUS.emit("ifq-on-do", this.currIndex, this, this.downloading?.() || false);
      if (this.downloading?.()) return;
      if (!this.pushInExecutableQueue(oriented)) return;
      this.debouncer.addEvent("IFQ-EXECUTABLE", () => {
        console.log("IFQ-EXECUTABLE: ", this.executableQueue);
        Promise.all(this.executableQueue.splice(0, conf.paginationIMGCount).map((imfIndex) => this[imfIndex].start())).then(() => {
          const picked = this.cherryPick?.(this.chapterIndex);
          this.executableQueue.filter((i) => !picked || picked.picked(i)).forEach((imfIndex) => this[imfIndex].start());
        });
      }, 300);
    }
    //等待图片获取器执行成功后的上报，如果该图片获取器上报自身所在的索引和执行队列的currIndex一致，则改变大图
    finishedReport(index, success, imf) {
      if (this.length === 0) return;
      if (!success || imf.stage !== FetchState.DONE) return;
      this.finishedIndex.add(index);
      if (this.dataSize < 1e9) {
        this.dataSize += imf.data?.byteLength || 0;
      }
      EBUS.emit("ifq-on-finished-report", index, this);
    }
    //如果开始的索引小于0,则修正索引为0,如果开始的索引超过队列的长度,则修正索引为队列的最后一位
    fixIndex(start) {
      return start < 0 ? 0 : start > this.length - 1 ? this.length - 1 : start;
    }
    /**
     * 将方向前|后 的未加载大图数据的图片获取器放入待加载队列中
     * 从当前索引开始，向后或向前进行遍历，
     * 会跳过已经加载完毕的图片获取器，
     * 会添加正在获取大图数据或未获取大图数据的图片获取器到待加载队列中
     * @param oriented 方向 前后 
     * @returns 是否添加成功
     */
    pushInExecutableQueue(oriented) {
      this.executableQueue = [];
      for (let count = 0, index = this.currIndex; this.checkOutbounds(index, oriented, count); oriented === "next" ? ++index : --index) {
        if (this[index].stage === FetchState.DONE) continue;
        this.executableQueue.push(index);
        count++;
      }
      return this.executableQueue.length > 0;
    }
    // 如果索引已到达边界且添加数量在配置最大同时获取数量的范围内
    checkOutbounds(index, oriented, count) {
      let ret = false;
      if (oriented === "next") ret = index < this.length;
      if (oriented === "prev") ret = index > -1;
      if (!ret) return false;
      if (count < conf.threads + conf.paginationIMGCount - 1) return true;
      return false;
    }
    findImgIndex(ele) {
      for (let index = 0; index < this.length; index++) {
        if (this[index].node.equal(ele)) {
          return index;
        }
      }
      return 0;
    }
  }

  class IdleLoader {
    queue;
    processingIndexList;
    restartId;
    maxWaitMS;
    minWaitMS;
    onFailedCallback;
    autoLoad = false;
    debouncer;
    cherryPick;
    constructor(queue) {
      this.queue = queue;
      this.processingIndexList = [0];
      this.maxWaitMS = 1e3;
      this.minWaitMS = 300;
      this.autoLoad = conf.autoLoad;
      this.debouncer = new Debouncer();
      EBUS.subscribe("ifq-on-do", (currIndex, _, downloading) => !downloading && this.abort(currIndex));
      EBUS.subscribe("imf-on-finished", (index) => {
        if (!this.processingIndexList.includes(index)) return;
        this.wait().then(() => {
          this.checkProcessingIndex();
          this.start();
        });
      });
      EBUS.subscribe("pf-change-chapter", (index) => !this.queue.downloading?.() && this.abort(index > 0 ? 0 : void 0));
      window.addEventListener("focus", () => {
        if (conf.autoLoadInBackground) return;
        this.debouncer.addEvent("Idle-Load-on-focus", () => {
          console.log("[ IdleLoader ] window focus, document.hidden:", document.hidden);
          if (document.hidden) return;
          this.abort(0, 10);
        }, 100);
      });
      EBUS.subscribe("pf-on-appended", (_total, _nodes, _chapterIndex, done) => {
        if (done || this.processingIndexList.length > 0) return;
        this.abort(this.queue.currIndex, 100);
      });
    }
    onFailed(cb) {
      this.onFailedCallback = cb;
    }
    start() {
      if (!this.autoLoad) return;
      if (document.hidden && !conf.autoLoadInBackground) return;
      if (this.processingIndexList.length === 0) return;
      if (this.queue.length === 0) return;
      evLog("info", "Idle Loader start at:" + this.processingIndexList.toString());
      for (const processingIndex of this.processingIndexList) {
        this.queue[processingIndex].start();
      }
    }
    checkProcessingIndex() {
      if (this.queue.length === 0) {
        return;
      }
      const picked = this.cherryPick?.() || new CherryPick();
      const foundFetcherIndex = /* @__PURE__ */ new Set();
      let hasFailed = false;
      for (let i = 0; i < this.processingIndexList.length; i++) {
        const processingIndex = this.processingIndexList[i];
        const imf = this.queue[processingIndex];
        if (imf.stage === FetchState.FAILED) {
          hasFailed = true;
        }
        if (imf.lock || imf.stage === FetchState.URL) {
          continue;
        }
        for (let j = Math.min(processingIndex + 1, this.queue.length - 1), limit = this.queue.length; j < limit; j++) {
          if (picked.picked(j)) {
            const imf2 = this.queue[j];
            if (!imf2.lock && imf2.stage === FetchState.URL && !foundFetcherIndex.has(j)) {
              foundFetcherIndex.add(j);
              this.processingIndexList[i] = j;
              break;
            }
            if (imf2.stage === FetchState.FAILED) {
              hasFailed = true;
            }
          }
          if (j >= this.queue.length - 1) {
            limit = processingIndex;
            j = 0;
          }
        }
        if (foundFetcherIndex.size === 0) {
          this.processingIndexList.length = 0;
          if (hasFailed && this.onFailedCallback) {
            this.onFailedCallback();
            this.onFailedCallback = void 0;
          }
          return;
        }
      }
    }
    async wait() {
      const { maxWaitMS, minWaitMS } = this;
      return new Promise(function(resolve) {
        const time = Math.floor(Math.random() * maxWaitMS + minWaitMS);
        window.setTimeout(() => resolve(true), time);
      });
    }
    abort(newIndex, delayRestart) {
      this.processingIndexList = [];
      this.debouncer.addEvent("IDLE-LOAD-ABORT", () => {
        if (!this.autoLoad) return;
        if (newIndex === void 0) return;
        if (this.queue.downloading?.()) return;
        this.processingIndexList = [newIndex];
        this.checkProcessingIndex();
        this.start();
      }, delayRestart || conf.restartIdleLoader);
    }
  }

  const PICA = new pica({ features: ["wasm"] });
  const PICA_OPTION = { filter: "box" };
  async function resizing(from, to) {
    return PICA.resize(from, to, PICA_OPTION).then();
  }

  const DEFAULT_THUMBNAIL = "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
  const DEFAULT_NODE_TEMPLATE = document.createElement("div");
  DEFAULT_NODE_TEMPLATE.classList.add("img-node");
  DEFAULT_NODE_TEMPLATE.innerHTML = `
<a>
  <img decoding="async" loading="eager" title="untitle.jpg" src="" style="display: none;" />
  <canvas id="sample-canvas" width="100" height="100"></canvas>
</a>`;
  const OVERLAY_TIP = document.createElement("div");
  OVERLAY_TIP.classList.add("overlay-tip");
  OVERLAY_TIP.innerHTML = `<span>GIF</span>`;
  const EXTENSION_REGEXP = /\.(\w+)[^\/]*$|twimg.*format=(\w+)/;
  class NodeAction {
    icon;
    description;
    func;
    reueable = false;
    done = false;
    processing = false;
    constructor(icon, description, func, reueable) {
      this.icon = icon;
      this.description = description;
      this.func = func;
      this.reueable = reueable ?? false;
    }
  }
  class ImageNode {
    root;
    thumbnailSrc;
    href;
    title;
    onclick;
    imgElement;
    canvasElement;
    canvasCtx;
    delaySRC;
    _originSrc;
    blobSrc;
    mimeType;
    downloadBar;
    picked = true;
    debouncer = new Debouncer();
    rect;
    tags;
    actions = [];
    get originSrc() {
      return this._originSrc;
    }
    set originSrc(v) {
      this._originSrc = v;
      this.updateTagByExtension();
    }
    constructor(thumbnailSrc, href, title, delaySRC, originSrc, wh) {
      this.href = href;
      this.title = title;
      this.delaySRC = delaySRC;
      this.rect = wh;
      this.tags = /* @__PURE__ */ new Set();
      this.thumbnailSrc = thumbnailSrc;
      this.originSrc = originSrc;
    }
    setTags(...tags) {
      tags.forEach((t) => this.tags.add(t));
    }
    updateTagByExtension() {
      let src = this.originSrc || this.thumbnailSrc;
      if (!src) return;
      const ext = src.match(EXTENSION_REGEXP)?.find((match, i) => i > 0 && match);
      if (ext) {
        this.updateTagByPrefix("ext:" + ext);
      }
    }
    updateTagByPrefix(tag) {
      if (this.tags.has(tag)) return;
      const prefix = tag.split(":").shift();
      if (!prefix) return;
      const found = Array.from(this.tags.entries()).find(([t]) => t.startsWith(prefix));
      if (found?.[0]) {
        this.tags.delete(found?.[0]);
      }
      this.tags.add(tag);
    }
    create() {
      this.root = DEFAULT_NODE_TEMPLATE.cloneNode(true);
      const anchor = this.root.firstElementChild;
      anchor.href = this.href;
      anchor.target = "_blank";
      this.imgElement = anchor.firstElementChild;
      this.canvasElement = anchor.lastElementChild;
      this.imgElement.setAttribute("title", this.title);
      this.canvasElement.id = "canvas-" + this.title.replaceAll(/[^\w]/g, "_");
      const ratio = Math.max(conf.minRatio, this.ratio());
      this.root.style.aspectRatio = ratio.toString();
      this.root.setAttribute("data-ratio", ratio.toString());
      this.canvasElement.width = 512;
      this.canvasElement.height = Math.floor(512 / ratio);
      this.canvasCtx = this.canvasElement.getContext("2d");
      this.canvasCtx.fillStyle = "#aaa";
      this.canvasCtx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
      if (this.onclick) {
        anchor.addEventListener("click", (event) => {
          event.preventDefault();
          this.onclick(event);
        }, { passive: false, capture: false });
      }
      this.root.addEventListener("mouseenter", () => {
        if (this.actions.length === 0) return;
        this.root.addEventListener("mouseleave", () => {
          if (!this.root.querySelector(".img-node-actions > .img-node-action-btn-processing")) {
            this.root.querySelector(".img-node-actions")?.remove();
          }
        });
        if (this.root.querySelector(".img-node-actions")) return;
        const actionContainer = document.createElement("div");
        actionContainer.classList.add("img-node-actions");
        for (const action of this.actions) {
          const actionElem = document.createElement("button");
          actionElem.classList.add("img-node-action-btn");
          if (action.done) {
            actionElem.classList.add("img-node-action-btn-done");
          }
          actionElem.textContent = action.icon;
          actionElem.addEventListener("click", (ev) => {
            const target = ev.target;
            target.disabled = true;
            target.classList.add("img-node-action-btn-processing");
            action.processing = true;
            action.func(this).then(() => {
              target.classList.remove("img-node-action-btn-processing");
              target.classList.add("img-node-action-btn-done");
              target.disabled = false;
              action.done = true;
            }).catch((reason) => {
              target.classList.remove("img-node-action-btn-processing");
              target.classList.add("img-node-action-btn-error");
              target.disabled = false;
              EBUS.emit("notify-message", "error", `execute action [${action.icon}] failed, reason: ${reason}`);
              console.error(reason);
            }).finally(() => action.processing = false);
          }, { passive: false, capture: true });
          actionContainer.appendChild(actionElem);
        }
        this.root.appendChild(actionContainer);
      });
      return this.root;
    }
    resize(onfailed, onResize) {
      if (!this.root || !this.imgElement || !this.canvasElement) return onfailed("undefined elements");
      if (!this.imgElement.src || this.imgElement.src === DEFAULT_THUMBNAIL) return onfailed("empty or default src");
      if (this.root.offsetWidth <= 1) return onfailed("element too small");
      if (this.imgElement.src === this.imgElement.getAttribute("data-rendered")) return;
      this.imgElement.onload = null;
      this.imgElement.onerror = null;
      const oldRatio = Math.max(conf.minRatio, this.ratio());
      this.rect = { w: this.imgElement.naturalWidth, h: this.imgElement.naturalHeight };
      const newRatio = Math.max(conf.minRatio, this.ratio());
      const flowVision = this.root.parentElement?.classList.contains("fvg-sub-container");
      if (Math.abs(newRatio - oldRatio) > 0.07) {
        this.root.style.aspectRatio = newRatio.toString();
        this.root.setAttribute("data-ratio", newRatio.toString());
        if (flowVision) {
          this.canvasElement.height = this.root.offsetHeight;
          this.canvasElement.width = Math.floor(this.root.offsetHeight / newRatio);
        } else {
          this.canvasElement.width = this.root.offsetWidth;
          this.canvasElement.height = Math.floor(this.root.offsetWidth * newRatio);
        }
        onResize();
      }
      const resized = (src) => {
        this.imgElement.src = "";
        this.imgElement.setAttribute("data-rendered", src);
      };
      const cropHeight = this.imgElement.naturalWidth / newRatio;
      const cropY = (this.imgElement.naturalHeight - cropHeight) / 2;
      if (this.imgElement.src === this.thumbnailSrc) {
        this.canvasCtx?.drawImage(
          this.imgElement,
          0,
          cropY,
          this.imgElement.naturalWidth,
          cropHeight,
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        );
        resized(this.imgElement.src);
      } else {
        const re = (from) => {
          resizing(from, this.canvasElement).then(() => window.setTimeout(() => resized(this.imgElement.src), 100)).catch(() => resized(this.canvasCtx?.drawImage(
            this.imgElement,
            0,
            cropY,
            this.imgElement.naturalWidth,
            cropHeight,
            0,
            0,
            this.canvasElement.width,
            this.canvasElement.height
          ) || ""));
        };
        if (this.ratio() < conf.minRatio) {
          createImageBitmap(this.imgElement, 0, cropY, this.imgElement.naturalWidth, cropHeight).then(re);
        } else {
          re(this.imgElement);
        }
      }
    }
    ratio() {
      if (this.rect) {
        return Math.floor(this.rect.w / this.rect.h * 1e3) / 1e3;
      }
      return 1;
    }
    render(onfailed, onResize, force) {
      this.debouncer.addEvent("IMG-RENDER", () => {
        if (!this.imgElement) return onfailed("element undefined");
        let justThumbnail = !force && (!conf.hdThumbnails || !this.blobSrc);
        if (this.mimeType === "image/gif" || this.mimeType?.startsWith("video")) {
          const tip = OVERLAY_TIP.cloneNode(true);
          tip.firstChild.textContent = this.mimeType.split("/")[1].toUpperCase();
          this.root?.appendChild(tip);
          justThumbnail = true;
        }
        this.imgElement.onload = () => this.resize(onfailed, onResize);
        this.imgElement.onerror = () => onfailed("img load error");
        if (justThumbnail) {
          const delaySRC = this.delaySRC;
          this.delaySRC = void 0;
          if (delaySRC) {
            delaySRC.then((src) => (this.thumbnailSrc = src) && this.render(onfailed, onResize)).catch(onfailed);
          } else {
            this.imgElement.src = this.thumbnailSrc || this.blobSrc || DEFAULT_THUMBNAIL;
          }
        } else {
          this.imgElement.src = this.blobSrc || this.thumbnailSrc || DEFAULT_THUMBNAIL;
        }
      }, 30);
    }
    unrender() {
      if (!this.imgElement) return;
      this.imgElement.src = "";
    }
    progress(state) {
      if (!this.root) return;
      if (state.readyState === 4) {
        if (this.downloadBar && this.downloadBar.parentNode) {
          this.downloadBar.parentNode.removeChild(this.downloadBar);
        }
        return;
      }
      if (!this.downloadBar) {
        const downloadBar = document.createElement("div");
        downloadBar.classList.add("download-bar");
        downloadBar.innerHTML = `<div style="width: 0%"></div>`;
        this.downloadBar = downloadBar;
        this.root.firstElementChild.appendChild(this.downloadBar);
      }
      if (this.downloadBar) {
        this.downloadBar.firstElementChild.style.width = state.loaded / state.total * 100 + "%";
      }
    }
    changeStyle(fetchStatus, failedReason) {
      if (!this.root) return;
      const clearClass = () => this.root.classList.forEach((cls) => ["img-excluded", "img-fetching", "img-fetched", "img-fetch-failed"].includes(cls) && this.root?.classList.remove(cls));
      if (!this.picked) {
        clearClass();
        this.root.classList.add("img-excluded");
      } else {
        switch (fetchStatus) {
          case "fetching":
            clearClass();
            this.root.classList.add("img-fetching");
            break;
          case "fetched":
            clearClass();
            this.root.classList.add("img-fetched");
            break;
          case "failed":
            clearClass();
            this.root.classList.add("img-fetch-failed");
            break;
          case "init":
            clearClass();
            break;
        }
      }
      this.root.querySelector(".img-node-error-hint")?.remove();
      if (failedReason) {
        const errorHintElement = document.createElement("div");
        errorHintElement.classList.add("img-node-error-hint");
        errorHintElement.innerHTML = `<span>${failedReason}</span><br><span style="color: white;">You can click here retry again,<br>Or press mouse middle button to open origin image url</span>`;
        this.root.firstElementChild.appendChild(errorHintElement);
      }
    }
    equal(ele) {
      if (ele === this.root) {
        return true;
      }
      if (ele === this.root?.firstElementChild) {
        return true;
      }
      if (ele === this.canvasElement || ele === this.imgElement) {
        return true;
      }
      return false;
    }
  }

  class Chapter {
    id;
    title;
    source;
    // url
    queue;
    filteredQueue;
    thumbimg;
    sourceIter;
    done;
    onclick;
    meta;
    constructor(id, title, source, thumbimg) {
      this.id = id;
      this.title = title;
      this.source = source;
      this.queue = [];
      this.thumbimg = thumbimg;
      this.filteredQueue = [];
    }
  }
  class PageFetcher {
    chapters = [];
    chapterIndex = 0;
    queue;
    matcher;
    filter;
    beforeInit;
    afterInit;
    nodeActionDesc = [];
    appendPageLock = false;
    abortb = false;
    constructor(queue, matcher, filter) {
      this.queue = queue;
      this.matcher = matcher;
      this.filter = filter;
      this.filter.onChange = () => this.changeToChapter(this.chapterIndex);
      const debouncer = new Debouncer();
      EBUS.subscribe("ifq-on-finished-report", (index) => debouncer.addEvent("APPEND-NEXT-PAGES", () => this.appendPages(index), 5));
      EBUS.subscribe("imf-on-finished", (index, success, imf) => {
        if (index === 0 && success) {
          this.chapters[imf.chapterIndex].thumbimg = imf.node.blobSrc;
        }
      });
      EBUS.subscribe("pf-try-extend", () => debouncer.addEvent("APPEND-NEXT-PAGES", () => !this.queue.downloading?.() && this.appendNextPage(), 5));
      EBUS.subscribe("pf-retry-extend", () => !this.queue.downloading?.() && this.appendNextPage(true));
      EBUS.subscribe("pf-init", (cb) => this.init().then(cb));
      EBUS.subscribe("pf-append-chapters", (url) => this.appendNewChapters(url).then(() => this.chapters));
      EBUS.subscribe("pf-step-chapters", (oriented) => {
        if (oriented === "prev") {
          const newChapterIndex = this.chapterIndex - 1;
          if (newChapterIndex < 0) return;
          this.changeToChapter(newChapterIndex);
          EBUS.emit("notify-message", "info", "switch to chapter: " + this.chapters[newChapterIndex].title, 2e3);
        } else if (oriented === "next") {
          const newChapterIndex = this.chapterIndex + 1;
          if (newChapterIndex >= this.chapters.length) return;
          this.changeToChapter(newChapterIndex);
          EBUS.emit("notify-message", "info", "switch to chapter: " + this.chapters[newChapterIndex].title, 2e3);
        }
      });
      EBUS.subscribe("filter-update-all-tags", async () => {
        const chapter = this.chapters[this.chapterIndex];
        const set = /* @__PURE__ */ new Set();
        chapter.filteredQueue.forEach((imf) => imf.node.tags.forEach((t) => set.add(t)));
        this.filter.allTags = set;
      });
    }
    appendToView(total, nodes, chapterIndex, done) {
      EBUS.emit("pf-on-appended", total, nodes, chapterIndex, done);
    }
    abort() {
      this.abortb = true;
    }
    async appendNewChapters(url) {
      try {
        const chapters = await this.matcher.appendNewChapters(url, this.chapters);
        if (chapters && chapters.length > 0) {
          chapters.forEach((c) => {
            c.sourceIter = this.matcher.fetchPagesSource(c);
            c.onclick = (index) => this.changeToChapter(index);
          });
          this.chapters.push(...chapters);
          EBUS.emit("pf-update-chapters", this.chapters, true);
        }
      } catch (error) {
        EBUS.emit("notify-message", "error", `${error}`);
      }
    }
    async init() {
      this.beforeInit?.();
      try {
        if (conf.imgNodeActions.length > 0) {
          const AsyncFunction = async function() {
          }.constructor;
          this.nodeActionDesc = conf.imgNodeActions.filter((a) => {
            if (!a.workon) return true;
            const regexp = new RegExp(a.workon);
            return regexp.exec(window.location.href);
          }).map((ina) => {
            return {
              icon: ina.icon,
              description: ina.description,
              fun: AsyncFunction("imf", "imn", "gm_xhr", "EBUS", ina.funcBody)
            };
          });
        }
      } catch (err) {
        console.error(err);
        EBUS.emit("notify-message", "error", "cannot create your node actions, " + err);
      }
      this.chapters = await this.matcher.fetchChapters().catch((reason) => EBUS.emit("notify-message", "error", reason) || []);
      this.afterInit?.();
      this.chapters.forEach((c) => {
        c.sourceIter = this.matcher.fetchPagesSource(c);
        c.onclick = (index) => this.changeToChapter(index);
      });
      EBUS.emit("pf-update-chapters", this.chapters);
      if (this.chapters.length === 1) {
        this.changeToChapter(0);
      }
    }
    changeToChapter(index) {
      this.chapterIndex = index;
      EBUS.emit("pf-change-chapter", index, this.chapters[index]);
      const chapter = this.chapters[index];
      chapter.filteredQueue = [...this.filter.filterNodes(chapter.queue, true)];
      chapter.filteredQueue.forEach((node, i) => node.index = i);
      if (chapter.filteredQueue.length > 0) {
        this.appendToView(chapter.filteredQueue.length, chapter.filteredQueue, index, this.chapters[index].done);
      }
      if (!this.queue.downloading?.()) {
        this.beforeInit?.();
        this.restoreChapter(index).then(this.afterInit).catch(this.onFailed);
      }
    }
    /**
     * Switch to the specified chapter, and restore the previously loaded elements or load new ones
    */
    async restoreChapter(index) {
      this.chapterIndex = index;
      const chapter = this.chapters[this.chapterIndex];
      this.queue.restore(index, chapter.filteredQueue);
      if (!chapter.sourceIter) {
        evLog("error", "chapter sourceIter is not set!");
        return;
      }
      if (chapter.queue.length === 0) {
        const first = await chapter.sourceIter.next();
        if (!first.done) {
          if (first.value.error) throw first.value.error;
          await this.appendImages(first.value.value);
        }
        this.appendPages(this.queue.length);
      }
    }
    // append next page until the queue length is 60 more than finished
    async appendPages(appendedCount) {
      while (true) {
        if (appendedCount + 60 < this.queue.length) break;
        if (!await this.appendNextPage()) break;
      }
    }
    async appendNextPage(force) {
      if (this.appendPageLock) return false;
      try {
        this.appendPageLock = true;
        const chapter = this.chapters[this.chapterIndex];
        if (force) chapter.done = false;
        if (chapter.done || this.abortb) return false;
        const next = await chapter.sourceIter.next();
        if (next.done) {
          chapter.done = true;
          this.appendToView(this.queue.length, [], this.chapterIndex, true);
          return false;
        } else {
          if (next.value.error) {
            chapter.done = true;
            throw next.value.error;
          }
          return await this.appendImages(next.value.value);
        }
      } catch (error) {
        evLog("error", "PageFetcher:appendNextPage error: ", error);
        this.onFailed?.(error);
        return false;
      } finally {
        this.appendPageLock = false;
      }
    }
    async appendImages(pageSource) {
      try {
        const nodes = await this.obtainImageNodeList(pageSource);
        if (this.abortb) return false;
        if (nodes.length === 0) return false;
        const chapter = this.chapters[this.chapterIndex];
        const len = chapter.filteredQueue.length;
        const IFs = nodes.map(
          (imgNode, index) => {
            const imf = new IMGFetcher(index + len, imgNode, this.matcher, this.chapterIndex, this.chapters[this.chapterIndex].id);
            this.nodeActionDesc.forEach((nad) => {
              const f = async (node) => {
                const result = await nad.fun(imf, node, _GM_xmlhttpRequest, EBUS);
                if (result?.data) {
                  imf.contentType = result.data.type;
                  imf.data = new Uint8Array(await result.data.arrayBuffer());
                  imf.node.blobSrc = URL.createObjectURL(new Blob([imf.data], { type: imf.contentType }));
                  imf.render(true);
                  EBUS.emit("imf-on-finished", imf.index, true, imf);
                }
              };
              imgNode.actions.push(new NodeAction(nad.icon, nad.description, f));
            });
            return imf;
          }
        );
        chapter.queue.push(...IFs);
        const filteredIFs = this.filter.filterNodes(IFs, false);
        filteredIFs.forEach((node, i) => node.index = len + i);
        chapter.filteredQueue.push(...filteredIFs);
        this.queue.push(...filteredIFs);
        this.appendToView(this.queue.length, filteredIFs, this.chapterIndex);
        return true;
      } catch (error) {
        evLog("error", `page fetcher append images error: `, error);
        this.onFailed?.(error);
        return false;
      }
    }
    //从文档的字符串中创建缩略图元素列表
    async obtainImageNodeList(pageSource) {
      let tryTimes = 0;
      let err;
      while (tryTimes < 3) {
        try {
          return await this.matcher.parseImgNodes(pageSource, this.chapters[this.chapterIndex].id);
        } catch (error) {
          evLog("error", "warn: parse image nodes failed, retrying: ", error);
          tryTimes++;
          err = error;
        }
      }
      evLog("error", "warn: parse image nodes failed: reached max try times!");
      throw err;
    }
    //通过地址请求该页的文档
    async fetchDocument(pageURL) {
      return await window.fetch(pageURL).then((response) => response.text());
    }
    onFailed(reason) {
      EBUS.emit("notify-message", "error", reason.toString());
    }
  }

  class GalleryMeta {
    url;
    title;
    originTitle;
    downloader;
    tags;
    constructor(url, title) {
      this.url = url;
      this.title = title;
      this.tags = {};
      this.downloader = "https://github.com/MapoMagpie/eh-view-enhance";
    }
  }

  function parseImagePositions(styles) {
    return styles.map((st) => {
      const [x, y] = st.backgroundPosition.split(" ").map((v) => Math.abs(parseInt(v)));
      if (isNaN(x)) throw new Error("invalid background position");
      return { x, y, width: parseInt(st.width), height: parseInt(st.height) };
    });
  }
  function splitSpriteImage(image, positions) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const result = [];
    for (const pos of positions) {
      canvas.width = pos.width;
      canvas.height = pos.height;
      ctx.drawImage(image, pos.x, pos.y, pos.width, pos.height, 0, 0, pos.width, pos.height);
      result.push(canvas.toDataURL());
    }
    canvas.remove();
    return result;
  }
  async function splitImagesFromUrl(url, positions) {
    let data;
    for (let i = 0; i < 3; i++) {
      try {
        data = await simpleFetch(url, "blob");
        break;
      } catch (err) {
        evLog("error", "fetch thumbnail failed, ", err);
      }
    }
    if (!data) throw new Error("load sprite image error");
    url = URL.createObjectURL(data);
    const img = await new Promise((resolve, reject) => {
      const img2 = new Image();
      img2.onload = () => resolve(img2);
      img2.onerror = () => reject(new Error("load sprite image error"));
      img2.src = url;
    });
    URL.revokeObjectURL(url);
    return splitSpriteImage(img, positions);
  }

  class Result {
    value;
    error;
    static ok(value) {
      return {
        value
      };
    }
    static err(error) {
      return {
        error
      };
    }
  }
  class BaseMatcher {
    async fetchChapters() {
      return [new Chapter(0, "Default", window.location.href)];
    }
    title(chapter) {
      const meta = this.galleryMeta(chapter[0]);
      return meta.originTitle || meta.title || "unknown";
    }
    galleryMeta(_chapter) {
      return new GalleryMeta(window.location.href, document.title || "unknown");
    }
    workURLs() {
      return [this.workURL()];
    }
    async processData(data, contentType, _node) {
      return [data, contentType];
    }
    headers() {
      return {};
    }
    appendNewChapters(_url, _old) {
      throw new Error("this site does not support add new chapters yet");
    }
  }

  const regulars = {
    /** 有压缩的大图地址 */
    normal: /\<img\sid=\"img\"\ssrc=\"(.*?)\"\sstyle/,
    /** 原图地址 */
    original: /\<a\shref=\"(http[s]?:\/\/e[x-]?hentai(55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad)?\.(org|onion)\/fullimg?[^"\\]*)\"\>/,
    /** 大图重载地址 */
    nlValue: /\<a\shref=\"\#\"\sid=\"loadfail\"\sonclick=\"return\snl\(\'(.*)\'\)\"\>/,
    /** 是否开启自动多页查看器 */
    isMPV: /https?:\/\/e[-x]hentai(55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad)?\.(org|onion)\/mpv\/\w+\/\w+\/#page\w/,
    /** 多页查看器图片列表提取 */
    mpvImageList: /imagelist\s=\s(\[.*?\])/,
    /** 精灵图地址提取 */
    sprite: /url\((.*?)\)/
  };
  class EHMatcher extends BaseMatcher {
    name() {
      return "e-hentai";
    }
    docMap = {};
    // "http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/*",
    workURL() {
      return /e[-x]hentai(.*)?.(org|onion)\/g\/\w+/;
    }
    title(chapters) {
      const meta = chapters[0].meta || this.galleryMeta(chapters[0]);
      let title = "";
      if (conf.ehentaiTitlePrefer === "japanese") {
        title = meta.originTitle || meta.title || "UNTITLE";
      } else {
        title = meta.title || meta.originTitle || "UNTITLE";
      }
      if (chapters.length > 1) {
        title += "+" + chapters.length + "chapters";
      }
      return title;
    }
    galleryMeta(chapter) {
      if (chapter.meta) return chapter.meta;
      const doc = this.docMap[chapter.id];
      const titleList = doc.querySelectorAll("#gd2 h1");
      let title;
      let originTitle;
      if (titleList && titleList.length > 0) {
        title = titleList[0].textContent || void 0;
        if (titleList.length > 1) {
          originTitle = titleList[1].textContent || void 0;
        }
      }
      chapter.meta = new GalleryMeta(window.location.href, title || "UNTITLE");
      chapter.meta.originTitle = originTitle;
      const tagTrList = doc.querySelectorAll("#taglist tr");
      const tags = {};
      tagTrList.forEach((tr) => {
        const tds = tr.childNodes;
        const cat = tds[0].textContent;
        if (cat && tds[1]) {
          const list = [];
          tds[1].childNodes.forEach((ele) => {
            if (ele.textContent) list.push(ele.textContent);
          });
          tags[cat.replace(":", "")] = list;
        }
      });
      chapter.meta.tags = tags;
      return chapter.meta;
    }
    async fetchChapters() {
      const chapter = new Chapter(0, "Default", window.location.href);
      this.docMap[0] = document;
      this.galleryMeta(chapter);
      chapter.title = chapter.meta.title;
      return [chapter];
    }
    async appendNewChapters(url, old) {
      if (!this.workURL().test(url)) throw new Error("invaild gallery url");
      const doc = await window.fetch(url).then((response) => response.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
      let lastID = old[old.length - 1]?.id || 0;
      lastID = lastID + 1;
      const chapter = new Chapter(lastID, "NewChapter-" + lastID, url);
      this.docMap[lastID] = doc;
      this.galleryMeta(chapter);
      chapter.title = chapter.meta.title;
      return [chapter];
    }
    async parseImgNodes(source) {
      const list = [];
      const doc = await window.fetch(source).then((response) => response.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
      if (!doc) {
        throw new Error("warn: eh matcher failed to get document from source page!");
      }
      let isSprite = false;
      let getNodeInfo = (node) => {
        const anchor = node.firstElementChild;
        const image = anchor.firstElementChild;
        const title = image.getAttribute("title")?.replace(/Page\s\d+[:_]\s*/, "") || "untitle.jpg";
        const ret = {
          thumbnailImage: image.src,
          title,
          href: anchor.getAttribute("href"),
          wh: extractRectFromSrc(image.src) || { w: 100, h: 100 },
          style: node.style,
          backgroundImage: null,
          delaySrc: void 0
        };
        return ret;
      };
      let query = doc.querySelectorAll("#gdt .gdtl");
      if (!query || query.length == 0) {
        query = doc.querySelectorAll("#gdt .gdtm > div");
        isSprite = query?.length > 0;
        getNodeInfo = (node) => {
          const anchor = node.firstElementChild;
          const image = anchor.firstElementChild;
          const title = image.getAttribute("title")?.replace(/Page\s\d+[:_]\s*/, "") || "untitle.jpg";
          const backgroundImage = node.style.background.match(regulars.sprite)?.[1]?.replaceAll('"', "") || null;
          const ret = {
            backgroundImage,
            title,
            href: anchor.getAttribute("href"),
            wh: extractRectFromStyle(node.style) ?? { w: 100, h: 100 },
            style: node.style,
            thumbnailImage: "",
            delaySrc: void 0
          };
          return ret;
        };
      }
      if (!query || query.length == 0) {
        query = doc.querySelectorAll("#gdt > a");
        isSprite = query?.length > 0;
        getNodeInfo = (node) => {
          const anchor = node;
          let div = anchor.firstElementChild;
          if (!div.style.background || div.childElementCount > 0) {
            div = div.firstElementChild;
          }
          const title = div.getAttribute("title")?.replace(/Page\s\d+[:_]\s*/, "") || "untitle.jpg";
          const backgroundImage = div.style.background.match(regulars.sprite)?.[1]?.replaceAll('"', "") || null;
          const ret = {
            backgroundImage,
            title,
            href: anchor.getAttribute("href"),
            wh: extractRectFromStyle(div.style) ?? { w: 100, h: 100 },
            style: div.style,
            thumbnailImage: "",
            delaySrc: void 0
          };
          return ret;
        };
      }
      if (!query || query.length == 0) {
        throw new Error("warn: failed query image nodes!");
      }
      const nodeInfos = [];
      const nodes = Array.from(query);
      const n0 = getNodeInfo(nodes[0]);
      if (regulars.isMPV.test(n0.href)) {
        isSprite = true;
        const mpvDoc = await window.fetch(n0.href).then((response) => response.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
        const imageList = JSON.parse(mpvDoc.querySelector("#pane_outer + script")?.innerHTML.match(regulars.mpvImageList)?.[1] ?? "[]");
        const thumbnails = Array.from(mpvDoc.querySelectorAll("#pane_thumbs > a > div"));
        const gid = location.pathname.split("/")[2];
        for (let i = 0; i < imageList.length; i++) {
          const info = imageList[i];
          const backgroundImage = info.t.match(/\((http.*)\)/)?.[1] || null;
          thumbnails[i].style.background = "url" + info.t;
          const ni = {
            backgroundImage,
            title: info.n,
            href: `${location.origin}/s/${info.k}/${gid}-${i + 1}`,
            wh: extractRectFromStyle(thumbnails[i].style) ?? { w: 100, h: 100 },
            style: thumbnails[i].style,
            thumbnailImage: "",
            delaySrc: void 0
          };
          nodeInfos.push(ni);
        }
      } else {
        nodes.forEach((node) => nodeInfos.push(getNodeInfo(node)));
      }
      if (isSprite) {
        const spriteURLs = [];
        for (let i = 0; i < nodeInfos.length; i++) {
          const info = nodeInfos[i];
          if (!info.backgroundImage) {
            evLog("error", "e-hentai miss node, ", info);
            continue;
          }
          if (spriteURLs.length === 0 || spriteURLs[spriteURLs.length - 1].url !== info.backgroundImage) {
            spriteURLs.push({ url: info.backgroundImage, range: [{ index: i, style: info.style }] });
          } else {
            spriteURLs[spriteURLs.length - 1].range.push({ index: i, style: info.style });
          }
        }
        spriteURLs.forEach(({ url, range }) => {
          url = url.startsWith("http") ? url : window.location.origin + url;
          if (range.length === 1) {
            nodeInfos[range[0].index].thumbnailImage = url;
          } else {
            const reso = [];
            for (let i = 0; i < range.length; i++) {
              nodeInfos[range[i].index].delaySrc = new Promise((resolve, reject) => reso.push({ resolve, reject }));
            }
            splitImagesFromUrl(url, parseImagePositions(range.map((n) => n.style))).then((ret) => {
              for (let i = 0; i < ret.length; i++) {
                reso[i].resolve(ret[i]);
              }
            }).catch((err) => reso.forEach((r) => r.reject(err)));
          }
        });
      }
      for (let i = 0; i < nodeInfos.length; i++) {
        const info = nodeInfos[i];
        list.push(new ImageNode(info.thumbnailImage, info.href, info.title, info.delaySrc, void 0, info.wh));
      }
      return list;
    }
    async *fetchPagesSource(chapter) {
      const doc = this.docMap[chapter.id];
      const fristImageHref = doc.querySelector("#gdt a")?.getAttribute("href");
      if (fristImageHref && regulars.isMPV.test(fristImageHref)) {
        yield Result.ok(window.location.href);
        return;
      }
      const pages = Array.from(doc.querySelectorAll(".gtb td a")).filter((a) => a.href).map((a) => a.href);
      if (pages.length === 0) {
        throw new Error("cannot found next page elements");
      }
      let lastPage = 0;
      let url;
      for (const page of pages) {
        const u = new URL(page);
        const num = parseInt(u.searchParams.get("p") || "0");
        if (num >= lastPage) {
          lastPage = num;
          url = u;
        }
      }
      if (!url) {
        throw new Error("cannot found next page elements again");
      }
      url.searchParams.delete("p");
      yield Result.ok(url.href);
      for (let p = 1; p < lastPage + 1; p++) {
        url.searchParams.set("p", p.toString());
        yield Result.ok(url.href);
      }
    }
    async fetchOriginMeta(node, retry) {
      const text = await window.fetch(node.href).then((resp) => resp.text()).catch((reason) => new Error(reason));
      if (text instanceof Error || !text) throw new Error(`fetch source page error, ${text.toString()}`);
      let src;
      if (conf.fetchOriginal) {
        src = regulars.original.exec(text)?.[1].replace(/&amp;/g, "&");
        const nl = node.href.includes("?") ? node.href.split("?").pop() : void 0;
        if (src && nl) {
          src += "?" + nl;
        }
      }
      if (!src) src = regulars.normal.exec(text)?.[1];
      if (retry) {
        const nlValue = regulars.nlValue.exec(text)?.[1];
        if (nlValue) {
          node.href = node.href + (node.href.includes("?") ? "&" : "?") + "nl=" + nlValue;
          evLog("info", `IMG-FETCHER retry url:${node.href}`);
          const newMeta = await this.fetchOriginMeta(node, false);
          src = newMeta.url;
        } else {
          evLog("error", `Cannot matching the nlValue, content: ${text}`);
        }
      }
      if (!src) {
        evLog("error", "cannot matching the image url from content:\n", text);
        throw new Error(`cannot matching the image url from content. (the content is showing up in console(F12 open it)`);
      }
      if (!src.startsWith("http")) {
        src = window.location.origin + src;
      }
      if (src.endsWith("509.gif")) {
        throw new Error("509, Image limits Exceeded, Please reset your Quota!");
      }
      return { url: src, href: node.href };
    }
    async processData(data, contentType) {
      if (contentType.startsWith("text")) {
        if (data.byteLength === 1329) {
          throw new Error('fetching the raw image requires being logged in, please try logging in or disable "raw image"');
        }
      }
      return [data, contentType];
    }
  }
  function extractRectFromSrc(src) {
    if (!src) return void 0;
    const matches = src.match(/\/\w+-\d+-(\d+)-(\d+)-/);
    if (matches && matches.length === 3) {
      return { w: parseInt(matches[1]), h: parseInt(matches[2]) };
    } else {
      return void 0;
    }
  }
  function extractRectFromStyle(style) {
    const wh = { w: parseInt(style.width), h: parseInt(style.height) };
    if (isNaN(wh.w) || isNaN(wh.h)) return void 0;
    return wh;
  }

  function toMD5(s) {
    return md5(s);
  }
  function get_num(gid, page) {
    gid = window.atob(gid);
    page = window.atob(page);
    let n = toMD5(gid + page).slice(-1).charCodeAt(0);
    if (parseInt(gid) >= 268850 && parseInt(gid) <= 421925) {
      n %= 10;
    } else if (parseInt(gid) >= 421926) {
      n %= 8;
    }
    if (n < 10) {
      return 2 + 2 * n;
    } else {
      return 10;
    }
  }
  function drawImage(ctx, e, gid, page) {
    const width = e.width;
    const height = e.height;
    const s = get_num(window.btoa(gid), window.btoa(page));
    const l = parseInt((height % s).toString());
    const r = width;
    for (let m = 0; m < s; m++) {
      let c = Math.floor(height / s);
      let g = c * m;
      const w = height - c * (m + 1) - l;
      0 == m ? c += l : g += l;
      ctx.drawImage(e, 0, w, r, c, 0, g, r, c);
    }
  }
  class Comic18Matcher extends BaseMatcher {
    name() {
      return "禁漫";
    }
    meta;
    async fetchChapters() {
      const ret = [];
      const thumb = document.querySelector(".thumb-overlay > img");
      const chapters = Array.from(document.querySelectorAll(".visible-lg .episode > ul > a"));
      if (chapters.length > 0) {
        chapters.forEach((ch, i) => {
          const title = Array.from(ch.querySelector("li")?.childNodes || []).map((n) => n.textContent?.trim()).filter(Boolean).map((n) => n);
          const url = new URL(ch.href);
          url.searchParams.set("read_mode", "read-by-page");
          ret.push(new Chapter(i, title, url.href, thumb?.src));
        });
      } else {
        const first = document.querySelector(".visible-lg .read-block")?.firstElementChild;
        if (first === void 0) throw new Error("No page found");
        let href = "";
        if (first instanceof HTMLAnchorElement) {
          href = first.href;
        } else {
          href = first.getAttribute("href") || "";
        }
        if (!href || href.startsWith("javascript")) throw new Error("未能找到阅读按钮！");
        if (href.startsWith("#coinbuycomic")) throw new Error("此漫画需要硬币解锁！请点击开始阅读按钮进行解锁。");
        const url = new URL(href);
        url.searchParams.set("read_mode", "read-by-page");
        ret.push(new Chapter(0, "Default", url.href));
      }
      return ret;
    }
    async *fetchPagesSource(chapter) {
      yield Result.ok(chapter.source);
    }
    async parseImgNodes(source) {
      const list = [];
      const raw = await window.fetch(source).then((resp) => resp.text());
      const document2 = new DOMParser().parseFromString(raw, "text/html");
      const elements = Array.from(document2.querySelectorAll(".owl-carousel-page > .center > img"));
      for (const element of elements) {
        const src = element.getAttribute("data-src");
        if (!src) {
          evLog("error", "warn: cannot find img src", element);
          continue;
        }
        const title = src.split("/").pop();
        list.push(new ImageNode("", src, title, void 0, src));
      }
      return list;
    }
    async processData(data, contentType, node) {
      const reg = /(\d+)\/(\d+)\.(\w+)/;
      const matches = node.originSrc.match(reg);
      const gid = matches[1];
      const scrambleID = 220980;
      if (Number(gid) < scrambleID) return [data, contentType];
      const page = matches[2];
      const ext = matches[3];
      if (ext === "gif") return [data, contentType];
      const img = await createImageBitmap(new Blob([data], { type: contentType }));
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      drawImage(ctx, img, gid, page);
      return new Promise(
        (resolve) => canvas.toBlob(
          (blob) => blob?.arrayBuffer().then((buf) => resolve([new Uint8Array(buf), blob.type])).finally(() => canvas.remove()),
          contentType
        )
      );
    }
    workURL() {
      return /(18|jm)comic.*?\/album\/\d+/;
    }
    galleryMeta() {
      if (this.meta) return this.meta;
      const title = document.querySelector(".panel-heading h2")?.textContent || document.title || "UNTITLE";
      this.meta = new GalleryMeta(window.location.href, title);
      this.meta.originTitle = title;
      const tagTrList = document.querySelectorAll("div.tag-block > span");
      const tags = {};
      tagTrList.forEach((tr) => {
        const cat = tr.getAttribute("data-type")?.trim();
        if (cat) {
          const values = Array.from(tr.querySelectorAll("a")).map((a) => a.textContent).filter(Boolean);
          if (values.length > 0) {
            tags[cat] = values;
          }
        }
      });
      this.meta.tags = tags;
      return this.meta;
    }
    // https://cdn-msp.18comic.org/media/photos/529221/00004.gif
    async fetchOriginMeta(node, retry) {
      let src = node.originSrc;
      if (retry) {
        const matches = src.match(/\/\/cdn-msp(\d)?\./);
        let num = 1;
        if (matches !== null && matches.length > 0) {
          num = parseInt(matches[1] ?? "1");
          if (isNaN(num)) num = 1;
          num++;
          num = num % 3;
          num = num === 0 ? num = 3 : num;
        }
        src = src.replace(/\/\/cdn-msp(\d)?\./, `//cdn-msp${num === 1 ? "" : num}.`);
      }
      return { url: src };
    }
  }

  class AkumaMatcher extends BaseMatcher {
    originImages;
    index = 0;
    meta;
    name() {
      return "Akuma.moe";
    }
    title() {
      return this.galleryMeta().title;
    }
    galleryMeta() {
      if (!this.meta) {
        this.meta = this.initGalleryMeta(document);
      }
      return this.meta;
    }
    initGalleryMeta(doc) {
      const title = doc.querySelector("header.entry-header > h1")?.textContent ?? doc.title;
      const meta = new GalleryMeta(window.location.href, title);
      meta.originTitle = doc.querySelector("header.entry-header > span")?.textContent || void 0;
      meta.tags = Array.from(doc.querySelectorAll("ul.info-list > li.meta-data")).reduce((prev, curr) => {
        const cat = curr.querySelector("span.data")?.textContent?.replace(":", "").toLowerCase().trim();
        if (cat) {
          prev[cat] = Array.from(curr.querySelectorAll("span.value")).map((v) => v.textContent?.trim()).filter(Boolean);
        }
        return prev;
      }, {});
      return meta;
    }
    async *fetchPagesSource() {
      const csrf = document.querySelector("meta[name='csrf-token'][content]")?.content;
      if (!csrf) throw new Error("cannot get csrf token form this page");
      this.originImages = await window.fetch(window.location.href, {
        headers: { "X-CSRF-TOKEN": csrf, "X-Requested-With": "XMLHttpRequest", "Sec-Fetch-Dest": "empty" },
        method: "POST"
      }).then((res) => res.json());
      const pagRaw = Array.from(document.querySelectorAll("body > script")).find((s) => s.textContent?.trimStart().startsWith("var ajx"))?.textContent?.match(/pag = (\{.*?\}),/s)?.[1];
      if (!pagRaw) throw new Error("cannot get page info");
      const pag = JSON.parse(pagRaw.replaceAll(/(\w+) :/g, '"$1":'));
      let idx = pag.idx;
      yield Result.ok(document);
      while (idx * pag.stp < pag.cnt) {
        const res = await window.fetch(pag.act, {
          headers: {
            "X-CSRF-TOKEN": csrf,
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          method: "POST",
          body: `index=${idx}`
        });
        if (!res.ok) yield Result.err(new Error(`fetch thumbnails failed, status: ${res.statusText}`));
        idx++;
        yield Result.ok(await res.text().then((text) => new DOMParser().parseFromString(text, "text/html")));
      }
    }
    async parseImgNodes(doc) {
      const items = Array.from(doc.querySelectorAll("li > a.page-item"));
      if (items.length === 0) throw new Error("cannot find thumbnails");
      const ret = [];
      const digits = this.originImages.length.toString().length;
      for (const item of items) {
        const origin = this.originImages[this.index];
        const href = item.href;
        const thumb = item.firstElementChild.src;
        const ext = origin.split(".").pop() ?? "jpg";
        const originSrc = thumb.slice(0, thumb.indexOf("tbn")) + origin;
        const title = (this.index + 1).toString().padStart(digits, "0");
        ret.push(new ImageNode(thumb, href, `${title}.${ext}`, void 0, originSrc));
        this.index++;
      }
      return ret;
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    workURL() {
      return /akuma.moe\/g\/\w+\/?$/;
    }
  }

  class ArcaMatcher extends BaseMatcher {
    name() {
      return "Arcalive";
    }
    async *fetchPagesSource() {
      yield Result.ok(document);
    }
    async parseImgNodes(doc) {
      const imageString = ".article-content img:not(.arca-emoticon):not(.twemoji)";
      const videoString = ".article-content video:not(.arca-emoticon)";
      const elements = Array.from(doc.querySelectorAll(`${imageString}, ${videoString}`));
      const nodes = [];
      const digits = elements.length.toString().length;
      elements.forEach((element, i) => {
        if (element.tagName.toLowerCase() === "img") {
          const img = element;
          if (img.src && img.style.width !== "0px") {
            const src = img.src;
            const href = new URL(src);
            const ext = href.pathname.split(".").pop();
            href.searchParams.set("type", "orig");
            const title = (i + 1).toString().padStart(digits, "0") + "." + ext;
            nodes.push(new ImageNode(src, href.href, title, void 0, href.href));
          }
        } else if (element.tagName.toLowerCase() === "video") {
          const video = element;
          if (video.src) {
            const src = video.src;
            const href = new URL(src);
            const ext = href.pathname.split(".").pop();
            href.searchParams.set("type", "orig");
            const title = (i + 1).toString().padStart(digits, "0") + "." + ext;
            const poster = video.poster || "";
            nodes.push(new ImageNode(poster, href.href, title, void 0, href.href));
          }
        }
      });
      return nodes;
    }
    async fetchOriginMeta(node) {
      return { url: node.href };
    }
    workURL() {
      return /arca.live\/b\/\w*\/\d+/;
    }
  }

  class ArtStationMatcher extends BaseMatcher {
    pageData = /* @__PURE__ */ new Map();
    info = { username: "", projects: 0, assets: 0 };
    tags = {};
    name() {
      return "Art Station";
    }
    galleryMeta() {
      const meta = new GalleryMeta(window.location.href, `artstaion-${this.info.username}-w${this.info.projects}-p${this.info.assets}`);
      meta.tags = this.tags;
      return meta;
    }
    async *fetchPagesSource() {
      const { id, username } = await this.fetchArtistInfo();
      this.info.username = username;
      let page = 0;
      while (true) {
        page++;
        try {
          const projects = await this.fetchProjects(username, id.toString(), page);
          if (!projects || projects.length === 0) break;
          yield Result.ok(projects);
        } catch (error) {
          page--;
          yield Result.err(error);
        }
      }
    }
    async parseImgNodes(projects) {
      const projectURLs = projects.map((p) => `https://www.artstation.com/projects/${p.hash_id}.json`);
      const assets = await batchFetch(projectURLs, 10, "json");
      const ret = [];
      for (const asset of assets) {
        if (asset instanceof Error) {
          evLog("error", asset.message);
          EBUS.emit("notify-message", "error", asset.message, 8e3);
          continue;
        }
        this.info.projects++;
        this.tags[asset.slug] = asset.tags;
        for (let i = 0; i < asset.assets.length; i++) {
          const a = asset.assets[i];
          if (a.asset_type === "cover") continue;
          const thumb = a.image_url.replace("/large/", "/small/");
          const ext = a.image_url.match(/\.(\w+)\?\d+$/)?.[1] ?? "jpg";
          const title = `${asset.slug}-${i + 1}.${ext}`;
          let originSrc = a.image_url;
          if (a.has_embedded_player && a.player_embedded) {
            if (a.player_embedded.includes("youtube")) continue;
            originSrc = a.player_embedded;
          }
          this.info.assets++;
          ret.push(new ImageNode(thumb, asset.permalink, title, void 0, originSrc, { w: a.width, h: a.height }));
        }
      }
      return ret;
    }
    async fetchOriginMeta(node) {
      if (node.originSrc?.startsWith("<iframe")) {
        const iframe = node.originSrc.match(/src=['"](.*?)['"]\s/)?.[1];
        if (!iframe) throw new Error("cannot match video clip url");
        const doc = await window.fetch(iframe).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
        const source = doc.querySelector("video > source");
        if (!source) throw new Error("cannot find video element");
        return { url: source.src };
      }
      return { url: node.originSrc };
    }
    async processData(data, contentType) {
      if (contentType.startsWith("binary") || contentType.startsWith("text")) {
        return [data, "video/mp4"];
      }
      return [data, contentType];
    }
    workURL() {
      return /artstation.com\/[-\w]+(\/albums\/\d+)?$/;
    }
    async fetchArtistInfo() {
      const user = window.location.pathname.slice(1).split("/").shift();
      if (!user) throw new Error("cannot match artist's username");
      const info = await window.fetch(`https://www.artstation.com/users/${user}/quick.json`).then((res) => res.json());
      return info;
    }
    async fetchProjects(user, id, page) {
      const url = `https://www.artstation.com/users/${user}/projects.json?user_id=${id}&page=${page}`;
      const project = await window.fetch(url).then((res) => res.json());
      return project.data;
    }
  }

  const EXTRACT_C_DATA = /var C_DATA='(.*?)'/;
  function decrypt$1(key, raw) {
    const cryptoJS = CryptoJS;
    if (!cryptoJS) throw new Error("cryptoJS undefined");
    var keyenc = cryptoJS.enc.Utf8.parse(key);
    var ret = cryptoJS.AES.decrypt(raw, keyenc, {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7
    });
    return cryptoJS.enc.Utf8.stringify(ret).toString();
  }
  function parseBase64ToUtf8(raw) {
    const decodedBytes = Uint8Array.from(atob(raw), (char) => char.charCodeAt(0));
    const decoder = new TextDecoder();
    return decoder.decode(decodedBytes);
  }
  function initColamangaKeys() {
    return new Promise((resolve, reject) => {
      const jsURL = "https://www.colamanga.com/js/custom.js";
      const elem = document.createElement("script");
      elem.addEventListener("load", async () => {
        try {
          const text = await window.fetch(jsURL).then((res) => res.text());
          const keys = parseKeys(text);
          resolve(keys);
        } catch (reason) {
          reject(reason);
        }
      });
      elem.src = jsURL;
      elem.type = "text/javascript";
      document.querySelector("head").append(elem);
    });
  }
  function initColaMangaKeyMap() {
    return new Promise((resolve, reject) => {
      const jsURL = "https://www.colamanga.com/js/manga.read.js";
      const elem = document.createElement("script");
      elem.addEventListener("load", async () => {
        try {
          const text = await window.fetch(jsURL).then((res) => res.text());
          let fun;
          const matches = text.matchAll(/if\(_0x\w+==(0x\w+)\)return (_0x\w+)\((0x\w+)\);/gm);
          const keymap = {};
          let isEmpty = true;
          for (const m of matches) {
            const key = m[1];
            const fn2 = m[2];
            const pam = m[3];
            if (!fun) {
              const name = findTheFunction(text, fn2)?.[0]?.[0] ?? fn2;
              console.log("colamanga, the function name: ", name);
              fun = new Function("p", `return ${name}(p)`);
            }
            const val = fun(pam);
            keymap[parseInt(key)] = val;
            isEmpty = false;
          }
          if (isEmpty) throw new Error("cannot init key map from " + jsURL);
          const fn = parseGetActualKeyFunction(text);
          resolve([keymap, fn]);
        } catch (reason) {
          reject(reason);
        }
      });
      elem.src = jsURL;
      elem.type = "text/javascript";
      document.querySelector("head").append(elem);
    });
  }
  class ColaMangaMatcher extends BaseMatcher {
    infoMap = {};
    keymap;
    keys = ["dDeIieDgQpwVQZsJ", "54bilXmmMoYBqBcI", "KcmiZ8owmiBoPRMf", "4uOJvtnq5YYIKZWA", "lVfo0i0o4g3V78Rt", "i8XLTfT8Mvu1Fcv2"];
    getActualK;
    name() {
      return "colamanga";
    }
    async fetchChapters() {
      this.keys = await initColamangaKeys();
      [this.keymap, this.getActualK] = await initColaMangaKeyMap();
      const thumbimg = document.querySelector("dt.fed-part-rows > a")?.getAttribute("data-original") || void 0;
      const list = Array.from(document.querySelectorAll(".all_data_list .fed-part-rows > li > a"));
      return list.map((a, index) => new Chapter(index, a.title, a.href, thumbimg));
    }
    async *fetchPagesSource(source) {
      yield Result.ok(source.source);
    }
    async parseImgNodes(page, _chapterID) {
      const raw = await window.fetch(page).then((res) => res.text());
      const cdata = raw.match(EXTRACT_C_DATA)?.[1];
      if (!cdata) throw new Error("cannot find C_DATA from page: " + page);
      let infoRaw;
      for (const k of this.keys) {
        try {
          infoRaw = decrypt$1(k, parseBase64ToUtf8(cdata));
          break;
        } catch (_error) {
          evLog("error", _error.toString());
        }
      }
      if (!infoRaw) throw new Error("colamanga decrypt C_DATA failed");
      infoRaw = infoRaw.replace("};", "},");
      infoRaw = infoRaw.replaceAll("info=", "info:");
      infoRaw = "{" + infoRaw + "}";
      infoRaw = infoRaw.replaceAll(/(\w+):/g, '"$1":');
      const info = JSON.parse(infoRaw);
      const [count, path] = decryptInfo(info.mh_info.enc_code1, info.mh_info.enc_code2, info.mh_info.mhid, this.keys);
      if (count === void 0 || path === void 0) throw new Error("colamanga decrypt mh_info failed");
      const nodes = [];
      const href = window.location.origin + info.mh_info.webPath + info.mh_info.pageurl;
      this.infoMap[href] = info;
      for (let start = info.mh_info.startimg; start <= parseInt(count); start++) {
        const [name, url] = getImageURL(start, path, info);
        nodes.push(new ImageNode("", href, name, void 0, url));
      }
      return nodes;
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    async processData(data, _contentType, node) {
      const info = this.infoMap[node.href];
      if (!info) throw new Error("cannot found info from " + node.href);
      if (info.image_info.imgKey) {
        const decoded = this.decryptImageData(data, info.image_info.keyType, info.image_info.imgKey, this.keymap, this.keys);
        return [decoded, _contentType];
      } else {
        return [data, _contentType];
      }
    }
    workURL() {
      return /colamanga.com\/manga-\w*\/?$/;
    }
    headers() {
      return {
        "Referer": window.location.href,
        "Origin": window.location.origin
      };
    }
    decryptImageData(data, keyType, imgKey, keymap, keys) {
      let kRaw;
      if (keyType !== "" && keyType !== "0") {
        kRaw = keymap[parseInt(keyType)];
      } else {
        for (const k of keys) {
          try {
            kRaw = decrypt$1(k, imgKey);
            break;
          } catch (_error) {
            evLog("error", _error.toString());
          }
        }
      }
      const wordArray = convertUint8ArrayToWordArray(data);
      const encArray = { ciphertext: wordArray };
      const cryptoJS = CryptoJS;
      const actualK = this.getActualK?.(kRaw);
      const key = cryptoJS.enc.Utf8.parse(actualK);
      const de = cryptoJS.AES.decrypt(encArray, key, {
        iv: cryptoJS.enc.Utf8.parse("0000000000000000"),
        mode: cryptoJS.mode.CBC,
        padding: cryptoJS.pad.Pkcs7
      });
      const ret = convertWordArrayToUint8Array(de);
      return ret;
    }
  }
  function convertUint8ArrayToWordArray(data) {
    let words = [];
    let i = 0;
    let len = data.length;
    while (i < len) {
      words.push(
        data[i++] << 24 | data[i++] << 16 | data[i++] << 8 | data[i++]
      );
    }
    return {
      sigBytes: words.length * 4,
      words
    };
  }
  function convertWordArrayToUint8Array(data) {
    const len = data.words.length;
    const u8_array = new Uint8Array(len << 2);
    let offset = 0;
    let word;
    for (let i = 0; i < len; i++) {
      word = data.words[i];
      u8_array[offset++] = word >> 24;
      u8_array[offset++] = word >> 16 & 255;
      u8_array[offset++] = word >> 8 & 255;
      u8_array[offset++] = word & 255;
    }
    return u8_array;
  }
  function decryptInfo(countEncCode, pathEncCode, mhid, keys) {
    let count;
    for (const k of keys) {
      try {
        count = decrypt$1(k, parseBase64ToUtf8(countEncCode));
        if (count == "" || isNaN(parseInt(count))) {
          throw new Error("colamanga failed decrypt image count");
        }
        break;
      } catch (_error) {
        evLog("error", _error.toString());
      }
    }
    let path;
    for (const k of keys) {
      try {
        path = decrypt$1(k, parseBase64ToUtf8(pathEncCode));
        if (path == "" || !path.startsWith(mhid + "/")) {
          throw new Error("colamanga failed decrypt image path");
        }
        break;
      } catch (_error) {
        evLog("error", _error.toString());
      }
    }
    return [count, path];
  }
  function getImageURL(index, path, info) {
    const start = (info.mh_info.startimg + index - 1).toString().padStart(4, "0");
    let imgName = start + ".jpg";
    if (info.image_info.imgKey != void 0 && info.image_info.imgKey != "") {
      imgName = start + ".enc.webp";
    }
    const host = window.location.host.replace("www.", "");
    const url = "https://img" + info.mh_info.use_server + "." + host + "/comic/" + encodeURI(path) + imgName;
    return [imgName, url];
  }
  function parseKeys(raw) {
    const regex1 = /window(\[\w+\(0x[^)]+\)\]){2}\(((\w+)(\(0x[^)]+\))?),/gm;
    const matches = raw.matchAll(regex1);
    const keys = [];
    for (const m of matches) {
      const kv = m[3];
      const pv = m[4];
      if (!kv) continue;
      for (const [fn, param] of findTheFunction(raw, kv, pv)) {
        if (fn === null || param === null) continue;
        const key = new Function("return " + fn + param)();
        if (keys.includes(key)) continue;
        keys.push(key);
      }
    }
    return keys;
  }
  function parseGetActualKeyFunction(raw) {
    const regex2 = /(eval\(function.*?\)\)\)),_0x/;
    const evalExpression = raw.match(regex2)?.[1];
    return new Function("ksddd", `
        var actualKey = ksddd;
        ${evalExpression};
        return actualKey;
      `);
  }
  function findTheFunction(raw, val, param) {
    const reg = new RegExp(val + `=((\\w+)(\\([^)]+\\))?)[,; ]`, "gm");
    const matches = raw.matchAll(reg);
    const ret = [];
    let empty = true;
    for (const m of matches) {
      empty = false;
      const k = m[2];
      const p = m[3];
      if (p) param = p;
      if (k) {
        ret.push(...findTheFunction(raw, k, param));
      }
    }
    if (empty && raw.includes("function " + val)) {
      ret.push([val, param ?? null]);
    }
    return ret;
  }

  class DanbooruMatcher extends BaseMatcher {
    tags = {};
    blacklistTags = [];
    count = 0;
    name() {
      return this.site();
    }
    async *fetchPagesSource() {
      let doc = document;
      this.blacklistTags = this.getBlacklist(doc);
      yield Result.ok(doc);
      let tryTimes = 0;
      while (true) {
        const url = this.nextPage(doc);
        if (!url) break;
        try {
          doc = await window.fetch(url).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
        } catch (e) {
          tryTimes++;
          if (tryTimes > 3) yield Result.err(new Error(`fetch next page failed, ${e}`));
          continue;
        }
        tryTimes = 0;
        yield Result.ok(doc);
      }
    }
    async fetchOriginMeta(node) {
      const cached = this.cachedOriginMeta(node.href);
      if (cached) return cached;
      let url = null;
      const doc = await window.fetch(node.href).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
      if (conf.fetchOriginal) {
        url = this.getOriginalURL(doc);
      }
      if (!url) {
        url = this.getNormalURL(doc);
      }
      if (!url) throw new Error("Cannot find origin image or video url");
      let title;
      const ext = url.split(".").pop()?.match(/^\w+/)?.[0];
      const id = this.extractIDFromHref(node.href);
      if (ext && id) {
        title = `${id}.${ext}`;
      }
      return { url, title };
    }
    cachedOriginMeta(_href) {
      return null;
    }
    async parseImgNodes(doc) {
      const list = [];
      this.queryList(doc).forEach((ele) => {
        const [imgNode, tags] = this.toImgNode(ele);
        if (!imgNode) return;
        this.count++;
        if (tags !== "") {
          const tagList = tags.trim().replaceAll(": ", ":").split(" ").map((v) => v.trim()).filter((v) => v !== "");
          if (this.blacklistTags.findIndex((t) => tagList.includes(t)) >= 0) return;
          this.tags[imgNode.title.split(".")[0]] = tagList;
        }
        list.push(imgNode);
      });
      return list;
    }
    galleryMeta() {
      const url = new URL(window.location.href);
      const tags = url.searchParams.get("tags")?.trim();
      const meta = new GalleryMeta(window.location.href, `${this.site().toLowerCase().replace(" ", "-")}_${tags}_${this.count}`);
      meta.tags = this.tags;
      return meta;
    }
  }
  class DanbooruDonmaiMatcher extends DanbooruMatcher {
    site() {
      return "danbooru";
    }
    workURL() {
      return /danbooru.donmai.us\/(posts(?!\/)|$)/;
    }
    nextPage(doc) {
      return doc.querySelector(".paginator a.paginator-next")?.href || null;
    }
    queryList(doc) {
      return Array.from(doc.querySelectorAll(".posts-container > article"));
    }
    getBlacklist(doc) {
      return doc.querySelector("meta[name='blacklisted-tags']")?.getAttribute("content")?.split(",") || [];
    }
    toImgNode(ele) {
      const anchor = ele.querySelector("a");
      if (!anchor) {
        evLog("error", "warn: cannot find anchor element", anchor);
        return [null, ""];
      }
      const img = anchor.querySelector("img");
      if (!img) {
        evLog("error", "warn: cannot find img element", img);
        return [null, ""];
      }
      const href = anchor.getAttribute("href");
      if (!href) {
        evLog("error", "warn: cannot find href", anchor);
        return [null, ""];
      }
      return [new ImageNode(img.src, href, `${ele.getAttribute("data-id") || ele.id}.jpg`), ele.getAttribute("data-tags") || ""];
    }
    getOriginalURL(doc) {
      return doc.querySelector("#image-resize-notice > a")?.href || null;
    }
    getNormalURL(doc) {
      return doc.querySelector("#image")?.getAttribute("src") || null;
    }
    extractIDFromHref(href) {
      return href.match(/posts\/(\d+)/)?.[1];
    }
  }
  class Rule34Matcher extends DanbooruMatcher {
    site() {
      return "rule34";
    }
    workURL() {
      return /rule34.xxx\/index.php\?page=(post&s=list|favorites&s=view)/;
    }
    nextPage(doc) {
      if (window.location.search.includes("page=favorites")) {
        const u = doc.querySelector("#paginator a[name=next]")?.getAttribute("onclick")?.match(/location='(.*)?'/)?.[1] || null;
        return u ? window.location.origin + "/" + u : u;
      } else {
        return doc.querySelector(".pagination a[alt=next]")?.href || null;
      }
    }
    queryList(doc) {
      if (window.location.search.includes("page=favorites")) {
        return Array.from(doc.querySelectorAll("#content .thumb a"));
      } else {
        return Array.from(doc.querySelectorAll(".image-list > .thumb:not(.blacklisted-image) > a"));
      }
    }
    getBlacklist(doc) {
      return doc.querySelector("meta[name='blacklisted-tags']")?.getAttribute("content")?.split(",") || [];
    }
    toImgNode(ele) {
      const img = ele.querySelector("img");
      if (!img) {
        evLog("error", "warn: cannot find img element", img);
        return [null, ""];
      }
      const href = ele.getAttribute("href");
      if (!href) {
        evLog("error", "warn: cannot find href", ele);
        return [null, ""];
      }
      return [new ImageNode(img.src, href, `${ele.id}.jpg`), img.getAttribute("alt") || ""];
    }
    getOriginalURL(doc) {
      const raw = doc.querySelector("#note-container + script")?.textContent?.trim().replace("image = ", "").replace(";", "").replaceAll("'", '"');
      try {
        if (raw) {
          const info = JSON.parse(raw);
          return `${info.domain}/${info.base_dir}/${info.dir}/${info.img}`;
        }
      } catch (error) {
        evLog("error", "get original url failed", error);
      }
      return null;
    }
    getNormalURL(doc) {
      const element = doc.querySelector("#image,#gelcomVideoPlayer > source");
      return element?.getAttribute("src") || element?.getAttribute("data-cfsrc") || null;
    }
    extractIDFromHref(href) {
      return href.match(/id=(\d+)/)?.[1];
    }
  }
  const POST_INFO_REGEX = /Post\.register\((.*)\)/g;
  class YandereMatcher extends BaseMatcher {
    name() {
      return "yande.re";
    }
    infos = {};
    count = 0;
    workURL() {
      return /yande.re\/post(?!\/show\/.*)/;
    }
    async *fetchPagesSource() {
      let doc = document;
      yield Result.ok(doc);
      let tryTimes = 0;
      while (true) {
        const url = doc.querySelector("#paginator a.next_page")?.href;
        if (!url) break;
        try {
          doc = await window.fetch(url).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
        } catch (e) {
          tryTimes++;
          if (tryTimes > 3) throw new Error(`fetch next page failed, ${e}`);
          continue;
        }
        tryTimes = 0;
        yield Result.ok(doc);
      }
    }
    async parseImgNodes(doc) {
      const raw = doc.querySelector("body > form + script")?.textContent;
      if (!raw) throw new Error("cannot find post list from script");
      const matches = raw.matchAll(POST_INFO_REGEX);
      const ret = [];
      for (const match of matches) {
        if (!match || match.length < 2) continue;
        try {
          const info = JSON.parse(match[1]);
          this.infos[info.id.toString()] = info;
          this.count++;
          ret.push(new ImageNode(info.preview_url, `${window.location.origin}/post/show/${info.id}`, `${info.id}.${info.file_ext}`, void 0, void 0, { w: info.width, h: info.height }));
        } catch (error) {
          evLog("error", "parse post info failed", error);
          continue;
        }
      }
      return ret;
    }
    async fetchOriginMeta(node) {
      const id = node.href.split("/").pop();
      if (!id) {
        throw new Error(`cannot find id from ${node.href}`);
      }
      let url;
      if (conf.fetchOriginal) {
        url = this.infos[id]?.file_url;
      } else {
        url = this.infos[id]?.sample_url;
      }
      if (!url) {
        throw new Error(`cannot find url for id ${id}`);
      }
      return { url };
    }
    galleryMeta() {
      const url = new URL(window.location.href);
      const tags = url.searchParams.get("tags")?.trim();
      const meta = new GalleryMeta(window.location.href, `yande_${tags || "post"}_${this.count}`);
      meta["infos"] = this.infos;
      return meta;
    }
  }
  class KonachanMatcher extends BaseMatcher {
    name() {
      return "konachan";
    }
    infos = {};
    count = 0;
    workURL() {
      return /konachan.com\/post(?!\/show\/.*)/;
    }
    async *fetchPagesSource() {
      let doc = document;
      yield Result.ok(doc);
      let tryTimes = 0;
      while (true) {
        const url = doc.querySelector("#paginator a.next_page")?.href;
        if (!url) break;
        try {
          doc = await window.fetch(url).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
        } catch (e) {
          tryTimes++;
          if (tryTimes > 3) throw new Error(`fetch next page failed, ${e}`);
          continue;
        }
        tryTimes = 0;
        yield Result.ok(doc);
      }
    }
    async parseImgNodes(doc) {
      const raw = doc.querySelector("body > script + script")?.textContent;
      if (!raw) throw new Error("cannot find post list from script");
      const matches = raw.matchAll(POST_INFO_REGEX);
      const ret = [];
      for (const match of matches) {
        if (!match || match.length < 2) continue;
        try {
          const info = JSON.parse(match[1]);
          this.infos[info.id.toString()] = info;
          this.count++;
          const ext = info.file_ext || info.file_url.split(".").pop();
          ret.push(new ImageNode(info.preview_url, `${window.location.origin}/post/show/${info.id}`, `${info.id}.${ext}`));
        } catch (error) {
          evLog("error", "parse post info failed", error);
          continue;
        }
      }
      return ret;
    }
    async fetchOriginMeta(node) {
      const id = node.href.split("/").pop();
      if (!id) {
        throw new Error(`cannot find id from ${node.href}`);
      }
      let url;
      if (conf.fetchOriginal) {
        url = this.infos[id]?.file_url;
      } else {
        url = this.infos[id]?.sample_url;
      }
      if (!url) {
        throw new Error(`cannot find url for id ${id}`);
      }
      return { url };
    }
    galleryMeta() {
      const url = new URL(window.location.href);
      const tags = url.searchParams.get("tags")?.trim();
      const meta = new GalleryMeta(window.location.href, `konachan_${tags}_${this.count}`);
      meta["infos"] = this.infos;
      return meta;
    }
  }
  class GelBooruMatcher extends DanbooruMatcher {
    site() {
      return "gelbooru";
    }
    workURL() {
      return /gelbooru.com\/index.php\?page=post&s=list/;
    }
    nextPage(doc) {
      const href = doc.querySelector("#paginator a[alt=next]")?.href;
      if (href) return href;
      return doc.querySelector("#paginator b + a")?.href || null;
    }
    queryList(doc) {
      return Array.from(doc.querySelectorAll(".thumbnail-container > article.thumbnail-preview:not(.blacklisted-image) > a"));
    }
    getBlacklist(doc) {
      return doc.querySelector("meta[name='blacklisted-tags']")?.getAttribute("content")?.split(",") || [];
    }
    toImgNode(ele) {
      const img = ele.querySelector("img");
      if (!img) {
        evLog("error", "warn: cannot find img element", img);
        return [null, ""];
      }
      const href = ele.getAttribute("href");
      if (!href) {
        evLog("error", "warn: cannot find href", ele);
        return [null, ""];
      }
      const node = new ImageNode(img.src, href, `${ele.id}.jpg`);
      const tags = img.title.split(" ").map((t) => t.trim()).filter((t) => t && !(t.startsWith("score") || t.startsWith("rating"))).map((t) => "tag:" + t);
      node.setTags(...tags);
      return [node, img.getAttribute("alt") || ""];
    }
    getOriginalURL(doc) {
      return doc.querySelector("head > meta[property='og:image']")?.getAttribute("content") || null;
    }
    getNormalURL(doc) {
      const img = doc.querySelector("#image");
      if (img?.src) return img.src;
      const vidSources = Array.from(doc.querySelectorAll("#gelcomVideoPlayer > source"));
      if (vidSources.length === 0) return null;
      return vidSources.find((s) => s.type.endsWith("mp4"))?.src || vidSources[0].src;
    }
    extractIDFromHref(href) {
      return href.match(/id=(\d+)/)?.[1];
    }
  }
  class E621Matcher extends DanbooruMatcher {
    cache = /* @__PURE__ */ new Map();
    nextPage(doc) {
      return doc.querySelector(".pagination #paginator-next")?.href ?? null;
    }
    getOriginalURL() {
      throw new Error("Method not implemented.");
    }
    getNormalURL() {
      throw new Error("Method not implemented.");
    }
    extractIDFromHref() {
      throw new Error("Method not implemented.");
    }
    getBlacklist(doc) {
      const content = doc.querySelector("meta[name='blacklisted-tags']")?.getAttribute("content");
      if (!content) return [];
      return content.slice(1, -1).split(",").map((s) => s.slice(1, -1));
    }
    queryList(doc) {
      transient.imgSrcCSP = true;
      return Array.from(doc.querySelectorAll(".posts-container > article"));
    }
    toImgNode(ele) {
      const src = ele.getAttribute("data-preview-url");
      if (!src) return [null, ""];
      const tags = ele.getAttribute("data-tags");
      const id = ele.getAttribute("data-id");
      const normal = ele.getAttribute("data-sample-url");
      const original = ele.getAttribute("data-file-url");
      const fileExt = ele.getAttribute("data-file-ext") || void 0;
      if (!normal || !original || !id) return [null, ""];
      const href = `${window.location.origin}/posts/${id}`;
      const width = ele.getAttribute("data-width");
      const height = ele.getAttribute("data-height");
      let wh = void 0;
      if (width && height) {
        wh = { w: parseInt(width), h: parseInt(height) };
      }
      this.cache.set(href, { normal, original, id, fileExt });
      return [new ImageNode(src, href, `${id}.jpg`, void 0, void 0, wh), tags || ""];
    }
    cachedOriginMeta(href) {
      const cached = this.cache.get(href);
      if (!cached) throw new Error("miss origin meta: " + href);
      const ext = cached.fileExt ?? cached.original.split(".").pop() ?? "jpg";
      if (conf.fetchOriginal || ["webm", "webp", "mp4"].includes(ext)) {
        return { url: cached.original, title: `${cached.id}.${ext}` };
      }
      return { url: cached.normal, title: `${cached.id}.${cached.normal.split(".").pop()}` };
    }
    site() {
      return "e621";
    }
    workURL() {
      return /e621.net\/(posts(?!\/)|$)/;
    }
  }

  class Hanime1Matcher extends BaseMatcher {
    meta;
    galleryMeta() {
      return this.meta;
    }
    name() {
      return "hanime1.me";
    }
    parseMeta() {
      const title = document.querySelector(".comics-panel-margin h3.title")?.textContent?.replaceAll(/\s/g, "");
      const originTItle = document.querySelector(".comics-panel-margin h4.title")?.textContent?.replaceAll(/\s/g, "");
      const meta = new GalleryMeta(window.location.href, title ?? document.title);
      meta.originTitle = originTItle ?? void 0;
      Array.from(document.querySelectorAll(".comics-panel-margin .comics-metadata-margin-top h5")).forEach((ele) => {
        let cat = ele.firstChild?.textContent ?? "misc";
        cat = cat.trim().replace(/：:/, "");
        const tags = Array.from(ele.querySelectorAll("a")).map((t) => t.textContent?.trim()).filter(Boolean);
        meta.tags[cat] = tags;
      });
      this.meta = meta;
    }
    async *fetchPagesSource() {
      this.parseMeta();
      yield Result.ok(document);
    }
    async parseImgNodes(doc) {
      const items = Array.from(doc.querySelectorAll(".comics-panel-margin > a"));
      const item0 = items[0];
      const f = { j: "jpg", p: "png", g: "gif", w: "webp" };
      let prefix = "", extensions = void 0;
      if (item0) {
        const page0 = await window.fetch(item0.href).then((res) => res.text()).then((raw2) => new DOMParser().parseFromString(raw2, "text/html"));
        const img = page0.querySelector("#comic-content-wrapper img");
        prefix = img?.getAttribute("prefix") ?? img?.getAttribute("data-prefix") ?? "";
        const raw = page0.querySelector("#comic-content-wrapper script")?.textContent?.match(/extensions.innerHTML = '(.*)?'/)?.[1]?.replaceAll("&quot;", '"');
        extensions = raw ? JSON.parse(raw) : void 0;
      }
      const digits = items.length.toString().length;
      return items.map((item, index) => {
        const href = item.href;
        const thumb = item.querySelector("img")?.getAttribute("data-srcset") || "";
        let ext = "jpg";
        let src = prefix && extensions ? `${prefix}${extensions[index]}.${ext}` : void 0;
        if (prefix && extensions && prefix.includes("nhentai")) {
          const fk = extensions?.[index] ?? "j";
          ext = f[fk] ?? "jpg";
          src = `${prefix}${index + 1}.${ext}`;
        }
        return new ImageNode(thumb, href, (index + 1).toString().padStart(digits, "0") + "." + ext, void 0, src);
      });
    }
    async fetchOriginMeta(node, retry) {
      if (!retry && node.originSrc) return { url: node.originSrc };
      const page0 = await window.fetch(node.href).then((res) => res.text()).then((raw) => new DOMParser().parseFromString(raw, "text/html"));
      const img = page0.querySelector("#comic-content-wrapper img");
      if (!img) throw new Error("cannot find img from " + node.href);
      return { url: img.src };
    }
    headers() {
      return {
        "Origin": "",
        "Referer": ""
      };
    }
    workURL() {
      return /hanime1.me\/comic\/\d+\/?$/;
    }
  }

  const REGEXP_EXTRACT_INIT_ARGUMENTS = /initReader\("(.*?)\",\s?"(.*?)",\s?(.*?)\)/;
  const REGEXP_EXTRACT_HASH = /read\/\d+\/(\d+)$/;
  class HentaiNexusMatcher extends BaseMatcher {
    name() {
      return "hentainexus";
    }
    meta;
    baseURL;
    readerData;
    // readDirection?: string;
    async *fetchPagesSource() {
      this.meta = this.pasrseGalleryMeta(document);
      yield Result.ok(document);
    }
    async parseImgNodes(doc) {
      const result = [];
      const list = Array.from(doc.querySelectorAll(".section .container + .container > .box > .columns > .column a"));
      list.forEach((li, i) => {
        const img = li.querySelector("img");
        if (!img) return;
        const num = li.href.split("/").pop() || i.toString();
        const ext = img.src.split(".").pop();
        const title = num + "." + ext;
        result.push(new ImageNode(img.src, li.href, title));
      });
      return result;
    }
    async fetchOriginMeta(node) {
      if (!this.readerData) {
        const doc = await window.fetch(node.href).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
        const args = doc.querySelector("body > script")?.textContent?.match(REGEXP_EXTRACT_INIT_ARGUMENTS)?.slice(1);
        if (!args || args.length !== 3) throw new Error("cannot find reader data");
        try {
          this.initReader(args[0], args[1]);
        } catch (_error) {
          throw new Error("hentainexus updated decryption function");
        }
      }
      if (!this.readerData) throw new Error("cannot find reader data");
      const hash = node.href.match(REGEXP_EXTRACT_HASH)?.[1] || "001";
      const url = this.readerData.find((d) => d.url_label === hash)?.image;
      if (!url) throw new Error("cannot find image url");
      const ext = url.split(".").pop();
      return { url, title: hash + "." + ext };
    }
    workURL() {
      return /hentainexus.com\/view\/\d+/;
    }
    galleryMeta(chapter) {
      return this.meta || super.galleryMeta(chapter);
    }
    pasrseGalleryMeta(doc) {
      const title = doc.querySelector("h1.title")?.textContent || "UNTITLED";
      const meta = new GalleryMeta(this.baseURL || window.location.href, title);
      doc.querySelectorAll(".view-page-details tr").forEach((tr) => {
        const category = tr.querySelector(".viewcolumn")?.textContent?.trim();
        if (!category) return;
        let values = Array.from(tr.querySelector(".viewcolumn + td")?.childNodes || []).map((c) => c?.textContent?.trim()).filter(Boolean);
        if (values.length === 0) return;
        if (category === "Tags") {
          values = values.map((v) => v.replace(/\s?\([0-9,]*\)$/, ""));
        }
        meta.tags[category] = values;
      });
      return meta;
    }
    initReader(data, originTitle) {
      if (this.meta) {
        this.meta.originTitle = originTitle.replace(/::\s?HentaiNexus/, "");
      }
      const hostname = window.location.hostname.split("");
      const hostnameLen = Math.min(hostname.length, 64);
      const rawSplits = window.atob(data).split("");
      for (let i = 0; i < hostnameLen; i++) {
        rawSplits[i] = String.fromCharCode(
          rawSplits[i].charCodeAt(0) ^ hostname[i].charCodeAt(0)
        );
      }
      const decoded = rawSplits.join("");
      const poses = [];
      const list = [];
      for (let step2 = 2; list.length < 16; ++step2) {
        if (!poses[step2]) {
          list.push(step2);
          for (let j = step2 << 1; j <= 256; j += step2) {
            poses[j] = true;
          }
        }
      }
      let a = 0;
      for (let step2 = 0; step2 < 64; step2++) {
        a = a ^ decoded.charCodeAt(step2);
        for (let i = 0; i < 8; i++) {
          a = a & 1 ? a >>> 1 ^ 12 : a >>> 1;
        }
      }
      a = a & 7;
      const step = new Uint8Array(256);
      for (let i = 0; i < 256; i++) {
        step[i] = i;
      }
      let raw = "";
      let c = 0;
      for (let i = 0, b = 0; i < 256; i++) {
        b = (b + step[i] + decoded.charCodeAt(i % 64)) % 256;
        c = step[i];
        step[i] = step[b];
        step[b] = c;
      }
      for (let d = list[a], e = 0, f = 0, j = 0, k = 0, i = 0; i + 64 < decoded.length; i++) {
        j = (j + d) % 256;
        k = (f + step[(k + step[j]) % 256]) % 256;
        f = (f + j + step[j]) % 256;
        c = step[j];
        step[j] = step[k];
        step[k] = c;
        e = step[(k + step[(j + step[(e + f) % 256]) % 256]) % 256];
        raw += String.fromCharCode(decoded.charCodeAt(i + 64) ^ e);
      }
      this.readerData = JSON.parse(raw);
    }
  }

  const HENTAIZAP_TYPE_MAP = {
    "j": "jpg",
    "p": "png",
    "b": "bmp",
    "g": "gif",
    "w": "webp"
  };
  class HentaiZapMatcher extends BaseMatcher {
    meta;
    name() {
      return "HentaiZap";
    }
    galleryMeta() {
      if (this.meta) return this.meta;
      const title = document.querySelector(".gp_top_right > h1")?.textContent ?? document.title;
      this.meta = new GalleryMeta(window.location.href, title);
      Array.from(document.querySelectorAll(".gp_top_right_info > ul")).forEach((ul) => {
        const category = ul.querySelector("span.info_txt")?.textContent?.replace(":", "")?.toLowerCase();
        if (!category) return;
        const tags = Array.from(ul.querySelectorAll("a.gp_btn_tag")).map((e) => e.firstChild?.textContent).filter(Boolean);
        this.meta.tags[category] = tags;
      });
      return this.meta;
    }
    async *fetchPagesSource() {
      const gthRaw = Array.from(document.querySelectorAll("script")).find((e) => e.textContent?.trimStart()?.startsWith("var g_th"))?.textContent?.match(/\('(\{.*\})'\)/)?.[1];
      if (!gthRaw) throw new Error("cannot find g_th");
      const serverID = document.querySelector("input#load_server")?.value;
      if (!serverID) throw new Error("cannot find server id");
      const loadDir = document.querySelector("input#load_dir")?.value;
      if (!loadDir) throw new Error("cannot find load dir");
      const galleryID = document.querySelector("input#gallery_id")?.value;
      if (!galleryID) throw new Error("cannot find gallery id");
      const loadID = document.querySelector("input#load_id")?.value;
      if (!loadID) throw new Error("cannot find load id");
      const loadPages = document.querySelector("input#load_pages")?.value;
      if (!loadPages) throw new Error("cannot find load pages");
      const gth = JSON.parse(gthRaw);
      const info = {
        serverID,
        galleryID,
        loadDir,
        loadID,
        loadPages: parseInt(loadPages),
        images: gth
      };
      yield Result.ok(info);
    }
    async parseImgNodes(info) {
      const server = `m${info.serverID}.hentaizap.com`;
      const nodes = [];
      const digits = info.loadPages.toString().length;
      for (let i = 0; i < info.loadPages; i++) {
        const [t, w, h] = info.images[(i + 1).toString()]?.split(",") ?? [];
        if (!t || !w || !h) throw new Error("cannot find image g_th: " + (i + 1));
        const ext = HENTAIZAP_TYPE_MAP[t] ?? "webp";
        const thumb = `https://${server}/${info.loadDir}/${info.loadID}/${i + 1}t.jpg`;
        const href = `${window.location.origin}/g/${info.galleryID}/${i + 1}/`;
        const origin = `https://${server}/${info.loadDir}/${info.loadID}/${i + 1}.${ext}`;
        const title = (i + 1).toString().padStart(digits, "0");
        const node = new ImageNode(thumb, href, `${title}.${ext}`, void 0, origin, { w: parseInt(w), h: parseInt(h) });
        nodes.push(node);
      }
      return nodes;
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    workURL() {
      return /hentaizap.com\/gallery\/\w+\/?/;
    }
  }

  const CONTENT_DOMAIN = "gold-usergeneratedcontent.net";
  class HitomiGG {
    base = void 0;
    b;
    m;
    constructor(b, m) {
      this.b = b;
      this.m = new Function("g", m);
    }
    real_full_path_from_hash(hash) {
      return hash.replace(/^.*(..)(.)$/, "$2/$1/" + hash);
    }
    s(h) {
      const m = /(..)(.)$/.exec(h);
      return parseInt(m[2] + m[1], 16).toString(10);
    }
    subdomain_from_url(url, base, dir) {
      let retval = "";
      if (!base) {
        if (dir === "webp") {
          retval = "w";
        } else if (dir === "avif") {
          retval = "a";
        }
      }
      let b = 16;
      let r = /\/[0-9a-f]{61}([0-9a-f]{2})([0-9a-f])/;
      let m = r.exec(url);
      if (!m) {
        return retval;
      }
      let g = parseInt(m[2] + m[1], b);
      if (!isNaN(g)) {
        if (base) {
          retval = String.fromCharCode(97 + this.m(g)) + base;
        } else {
          retval = retval + (1 + this.m(g));
        }
      }
      return retval;
    }
    // gallery.js#322
    thumbURL(hash) {
      hash = hash.replace(/^.*(..)(.)$/, "$2/$1/" + hash);
      const url = "https://a." + CONTENT_DOMAIN + "/webpsmalltn/" + hash + ".webp";
      return url.replace(/\/\/..?\.(?:gold-usergeneratedcontent\.net|hitomi\.la)\//, "//" + this.subdomain_from_url(url, "tn", "webp") + "." + CONTENT_DOMAIN + "/");
    }
    originURL(hash, ext) {
      let dir = ext;
      if (dir === "webp" || dir === "avif") {
        dir = "";
      } else {
        dir += "/";
      }
      let url = "https://a." + CONTENT_DOMAIN + "/" + dir + this.b + this.s(hash) + "/" + hash + "." + ext;
      url = url.replace(/\/\/..?\.(?:gold-usergeneratedcontent\.net|hitomi\.la)\//, "//" + this.subdomain_from_url(url, this.base, ext) + "." + CONTENT_DOMAIN + "/");
      return url;
    }
  }
  const GG_M_REGEX = /m:\sfunction\(g\)\s{(.*?return.*?;)/s;
  const GG_B_REGEX = /b:\s'(\d*\/)'/;
  class HitomiMather extends BaseMatcher {
    name() {
      return "hitomi";
    }
    gg;
    meta = {};
    infoRecord = {};
    formats = ["avif", "jxl", "webp"];
    formatIndex = 0;
    workURL() {
      return /hitomi.la\/(?!reader)\w+\/.*\d+\.html/;
    }
    async fetchChapters() {
      this.formatIndex = conf.hitomiFormat === "auto" ? 0 : this.formats.indexOf(conf.hitomiFormat);
      if (this.formatIndex === -1) {
        throw new Error("invalid hitomi format: " + conf.hitomiFormat);
      }
      const ggRaw = await window.fetch(`https://ltn.${CONTENT_DOMAIN}/gg.js?_=${Date.now()}`).then((resp) => resp.text());
      this.gg = new HitomiGG(GG_B_REGEX.exec(ggRaw)[1], GG_M_REGEX.exec(ggRaw)[1]);
      const ret = [];
      ret.push(new Chapter(
        0,
        document.querySelector("#gallery-brand")?.textContent || "default",
        window.location.href,
        document.querySelector(".content > .cover-column > .cover img")?.src
      ));
      if (conf.mcInSites?.indexOf("hitomi") === -1) {
        return ret;
      }
      document.querySelectorAll("#related-content > div").forEach((element, i) => {
        const a = element.querySelector("h1.lillie > a");
        if (a) {
          ret.push(new Chapter(
            i + 1,
            a.textContent || "default-" + (i + 1),
            a.href,
            element.querySelector("img")?.src
          ));
        }
      });
      return ret;
    }
    async *fetchPagesSource(chapter) {
      const url = chapter.source;
      const galleryID = url.match(/([0-9]+)(?:\.html)/)?.[1];
      if (!galleryID) {
        throw new Error("cannot query hitomi gallery id");
      }
      const infoRaw = await window.fetch(`https://ltn.${CONTENT_DOMAIN}/galleries/${galleryID}.js`).then((resp) => resp.text()).then((text) => text.replace("var galleryinfo = ", ""));
      if (!infoRaw) {
        throw new Error("cannot query hitomi gallery info");
      }
      const info = JSON.parse(infoRaw);
      this.setGalleryMeta(info, galleryID, chapter);
      yield Result.ok(info);
    }
    async parseImgNodes(info) {
      const files = info.files;
      const list = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let ext = this.formats.slice(this.formatIndex).find((format) => file["has" + format] === 1);
        if (!ext) {
          ext = "webp";
          evLog("error", "no format found: ", files[i]);
        }
        const title = file.name.replace(/\.\w+$/, "");
        const src = this.gg.originURL(file.hash, ext);
        const { width, height } = file;
        list.push(new ImageNode(this.gg.thumbURL(files[i].hash), src, title + "." + ext, void 0, src, width && height ? { w: width, h: height } : void 0));
      }
      return list;
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    setGalleryMeta(info, galleryID, chapter) {
      this.infoRecord[chapter.id] = info;
      this.meta[chapter.id] = new GalleryMeta(chapter.source, info.title || "hitomi-" + galleryID);
      this.meta[chapter.id].originTitle = info.japanese_title || void 0;
      const excludes = ["scene_indexes", "files"];
      for (const key in info) {
        if (excludes.indexOf(key) > -1) {
          continue;
        }
        this.meta[chapter.id].tags[key] = info[key];
      }
    }
    galleryMeta(chapter) {
      return this.meta[chapter.id];
    }
    title() {
      const entries = Object.entries(this.infoRecord);
      if (entries.length === 0) return "hitomi-unknown";
      if (entries.length === 1) {
        return entries[0][1].japanese_title || entries[0][1].title || "hitomi-unknown";
      } else {
        return "hitomi-multiple" + entries.map((entry) => entry[1].id).join("_");
      }
    }
  }

  function q(selector, parent) {
    const element = parent.querySelector(selector);
    if (!element) {
      throw new Error(`Can't find element: ${selector}`);
    }
    return element;
  }

  class IMHentaiMatcher extends BaseMatcher {
    name() {
      return "im-hentai";
    }
    meta;
    data;
    gth;
    async fetchOriginMeta(node, _) {
      return { url: node.originSrc };
    }
    async parseImgNodes() {
      if (!this.data || !this.gth) {
        throw new Error("impossibility");
      }
      const ret = [];
      const digits = this.data.total.toString().length;
      for (let i = 1; i <= this.data.total; i++) {
        const url = `https://m${this.data.server}.imhentai.xxx/${this.data.imgDir}/${this.data.gid}/${i}t.jpg`;
        const href = `https://imhentai.xxx/view/${this.data.uid}/${i}/`;
        const ext = imParseExt(this.gth[i.toString()]);
        const originSrc = `https://m${this.data.server}.imhentai.xxx/${this.data.imgDir}/${this.data.gid}/${i}.${ext}`;
        let wh = void 0;
        const splits = this.gth[i.toString()].split(",");
        if (splits.length === 3) {
          wh = { w: parseInt(splits[1]), h: parseInt(splits[2]) };
        }
        const node = new ImageNode(url, href, `${i.toString().padStart(digits, "0")}.${ext}`, void 0, originSrc, wh);
        ret.push(node);
      }
      return ret;
    }
    async *fetchPagesSource() {
      const server = q("#load_server", document).value;
      const uid = q("#gallery_id", document).value;
      const gid = q("#load_id", document).value;
      const imgDir = q("#load_dir", document).value;
      const total = q("#load_pages", document).value;
      this.data = { server, uid, gid, imgDir, total: Number(total) };
      const gthRaw = Array.from(document.querySelectorAll("script")).find((s) => s.textContent?.trimStart().startsWith("var g_th"))?.textContent?.match(/\('(\{.*?\})'\)/)?.[1];
      if (!gthRaw) throw new Error("cannot match gallery images info");
      this.gth = JSON.parse(gthRaw);
      yield Result.ok(null);
    }
    title() {
      const meta = this.galleryMeta();
      let title = "";
      if (conf.ehentaiTitlePrefer === "japanese") {
        title = meta.originTitle || meta.title || "UNTITLE";
      } else {
        title = meta.title || meta.originTitle || "UNTITLE";
      }
      return title;
    }
    galleryMeta() {
      if (this.meta) return this.meta;
      const title = document.querySelector(".right_details > h1")?.textContent || void 0;
      const originTitle = document.querySelector(".right_details > p.subtitle")?.textContent || void 0;
      const meta = new GalleryMeta(window.location.href, title || "UNTITLE");
      meta.originTitle = originTitle;
      meta.tags = {};
      const list = Array.from(document.querySelectorAll(".galleries_info > li"));
      for (const li of list) {
        let cat = li.querySelector(".tags_text")?.textContent;
        if (!cat) continue;
        cat = cat.replace(":", "").trim();
        if (!cat) continue;
        const tags = Array.from(li.querySelectorAll("a.tag")).map((a) => a.firstChild?.textContent?.trim()).filter((v) => Boolean(v));
        meta.tags[cat] = tags;
      }
      this.meta = meta;
      return this.meta;
    }
    workURL() {
      return /imhentai.xxx\/gallery\/\d+\//;
    }
  }
  function imParseExt(str) {
    switch (str.slice(0, 1)) {
      case "j":
        return "jpg";
      case "g":
        return "gif";
      case "p":
        return "png";
      case "w":
        return "webp";
      case "a":
        return "avif";
      case "m":
        return "mp4";
      default:
        throw new Error("cannot parse image extension from info: " + str);
    }
  }

  class InstagramMatcher extends BaseMatcher {
    config;
    name() {
      return "Instagram";
    }
    // FIXME: instagram not change the title after hashchanged (chapter: Chapter[]): string { }
    async *fetchPagesSource() {
      this.config = parseConfig();
      let cursor = null;
      while (true) {
        try {
          const [nodes, pageInfo] = await this.fetchPosts(cursor);
          cursor = pageInfo.end_cursor;
          yield Result.ok(nodes);
          if (!pageInfo.has_next_page) break;
        } catch (error) {
          yield Result.err(error);
        }
      }
    }
    async parseImgNodes(nodes) {
      const ret = [];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const videos = node.video_versions;
        const images = !videos && node.carousel_media && node.carousel_media.length > 0 ? node.carousel_media.map((n) => n.image_versions2) : [node.image_versions2];
        const digits = images.length.toString().length;
        for (let j = 0; j < images.length; j++) {
          const img = images[j];
          const title = images.length > 1 ? `${node.pk}-${(j + 1).toString().padStart(digits, "0")}` : node.pk;
          const ext = videos ? "mp4" : "jpeg";
          const [thumb, origin] = this.getThumbAndOrigin(img.candidates, videos);
          ret.push(new ImageNode(thumb?.url ?? "", `${window.location.origin}/p/${node.code}`, `${title}.${ext}`, void 0, origin.url, { w: thumb.width, h: thumb.height }));
        }
      }
      return ret;
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    workURL() {
      return /instagram.com\/(?!(home|explore|direct|reels|stories))\w+/;
    }
    async fetchPosts(cursor) {
      if (!this.config) throw new Error("instagram config null");
      const config = this.config;
      const headers = new Headers();
      headers.append("x-fb-friendly-name", config.apiName);
      headers.append("x-bloks-version-id", config.bloksVersionID);
      headers.append("x-csrftoken", config.csrfToken);
      headers.append("x-ig-app-id", config.appID);
      headers.append("x-fb-lsd", config.lsd);
      headers.append("x-asbd-id", "129477");
      let variables = {
        "username": config.username,
        "__relay_internal__pv__PolarisIsLoggedInrelayprovider": true,
        "__relay_internal__pv__PolarisFeedShareMenurelayprovider": true,
        "data": { "count": 12, "include_relationship_info": true, "latest_besties_reel_media": true, "latest_reel_media": true }
      };
      if (cursor) {
        variables.after = cursor;
        variables.before = null;
        variables.first = 12;
        variables.last = null;
      }
      const body = new URLSearchParams();
      body.append("av", config.userID);
      body.append("__d", "www");
      body.append("__user", "0");
      body.append("__a", "1");
      body.append("__req", "x");
      body.append("__hs", config.hasteSession);
      body.append("dpr", "1");
      body.append("__ccg", "UNKNOWN");
      body.append("__rev", config.clientVersion);
      body.append("__hsi", config.hsi);
      body.append("__dyn", config.dyn);
      body.append("__comet_req", "7");
      body.append("fb_dtsg", config.dtsg);
      body.append("lsd", config.lsd);
      body.append("__spin_r", config.spinR);
      body.append("__spin_b", config.spinB);
      body.append("__spin_t", config.spinT);
      body.append("fb_api_caller_class", "RelayModern");
      body.append("fb_api_req_friendly_name", config.apiName);
      body.append("variables", JSON.stringify(variables));
      body.append("server_timestamps", "true");
      body.append("doc_id", config.docID);
      const res = await window.fetch("https://www.instagram.com/graphql/query", { headers, body, method: "POST" }).then((res2) => res2.json());
      const data = res?.data?.xdt_api__v1__feed__user_timeline_graphql_connection;
      if (!data) throw new Error("failed fetch user's posts by API");
      return [data.edges.map((e) => e.node), data.page_info];
    }
    getThumbAndOrigin(candidates, videos) {
      const origin = videos?.[0] ?? candidates[0];
      let lastThumb = void 0;
      for (const ca of candidates) {
        if (!lastThumb) {
          lastThumb = ca;
          continue;
        }
        if (lastThumb.width < ca.width || ca.width <= 240) {
          break;
        }
        lastThumb = ca;
      }
      return [lastThumb, origin];
    }
  }
  function parseConfig() {
    const err = new Error("cannot find instagram config from script[data-sjs]");
    const raw = Array.from(document.querySelectorAll("script[data-sjs]")).find((s) => s.textContent?.trimStart().startsWith(`{"require":[["ScheduledServerJS","handle",null,[{"__bbox":{"define":`))?.textContent;
    if (!raw) throw err;
    const data = JSON.parse(raw);
    const arr = data.require?.[0]?.[3]?.[0]?.__bbox?.define;
    const map = arr.reduce((prev, curr) => {
      prev[curr[0]] = curr[2];
      return prev;
    }, {});
    if (!map) throw err;
    let csrfToken = map["InstagramSecurityConfig"]?.csrf_token;
    let lsd = map["LSD"]?.token;
    let bloksVersionID = map["WebBloksVersioningID"]?.versioningID;
    let appID = map["CurrentUserInitialData"]?.APP_ID;
    let userID = map["CurrentUserInitialData"]?.NON_FACEBOOK_USER_ID;
    let hasteSession = map["SiteData"]?.haste_session;
    let clientVersion = map["SiteData"]?.client_revision;
    let hsi = map["SiteData"]?.hsi;
    let spinR = map["SiteData"]?.__spin_r;
    let spinB = map["SiteData"]?.__spin_b;
    let spinT = map["SiteData"]?.__spin_t;
    let dtsg = map["DTSGInitData"]?.token;
    const username = window.location.pathname.split("/")?.[1];
    if (!csrfToken || !lsd || !bloksVersionID || !appID || !userID || !hasteSession || !clientVersion || !hsi || !spinR || !spinB || !spinT || !dtsg || !username) throw err;
    const docID = "8363144743749214";
    const apiName = "PolarisProfilePostsTabContentQuery_connection";
    const dyn = "7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJxS0k24o0B-q1ew65xO0FE2awgo9oO0n24oaEnxO1ywOwv89k2C1Fwc60D87u3ifK0EUjwGzEaE2iwNwmE2eUlwhEe87q7U1mVEbUGdG1QwTU9UaQ0Lo6-3u2WE5B08-269wr86C1mwPwUQp1yUb9UK6V8aUuwm9EO6UaU4W";
    return {
      csrfToken,
      lsd,
      bloksVersionID,
      appID,
      userID,
      hasteSession,
      clientVersion,
      hsi,
      spinR,
      spinB,
      spinT,
      dtsg,
      docID,
      apiName,
      dyn,
      username
    };
  }

  const PICTURE_EXTENSION = ["jpeg", "jpg", "png", "gif", "webp", "bmp", "avif", "jxl"];
  const VIDEO_EXTENSION = ["mp4", "webm", "ogg", "ogv", "mov", "avi", "mkv", "av1"];
  function isImage(ext) {
    return PICTURE_EXTENSION.includes(ext);
  }
  function isVideo(ext) {
    return VIDEO_EXTENSION.includes(ext);
  }

  class KemonoListAbstract {
    async *next() {
      const url = new URL(window.location.href);
      let page = parseInt(url.searchParams.get("o") ?? "0");
      page = isNaN(page) ? 0 : page;
      const query = url.searchParams.get("q");
      while (true) {
        const ret = await window.fetch(this.getURL(page, query)).then((res) => res.json());
        if (ret.error) {
          yield Result.err(new Error(ret.error));
        }
        const results = this.getPosts(ret);
        if (!results || results.length === 0) break;
        page += results.length;
        const infoMap = kemonoInfoPathMap(this.getList(ret));
        if (infoMap.size > 0) {
          results.forEach((r) => {
            if (r.file?.path) {
              const info = infoMap.get(r.file.path);
              r.file.name = info?.name;
              r.file.server = info?.server;
            }
            if (r.attachments && r.attachments.length > 0) {
              r.attachments.forEach((a) => {
                if (a.path) {
                  const info = infoMap.get(a.path);
                  a.name = info?.name;
                  a.server = info?.server;
                }
              });
            }
          });
        }
        yield Result.ok(results);
        if (results.length < 50) break;
      }
    }
  }
  class KemonoListArtist extends KemonoListAbstract {
    getURL(pages, query) {
      const url = new URL(window.location.href);
      const u = new URL(`${url.origin}/api/v1/${url.pathname}/posts-legacy`);
      if (pages > 0) {
        u.searchParams.set("o", pages.toString());
      }
      if (query) {
        u.searchParams.set("q", query);
      }
      return u.href;
    }
    getList(response) {
      const list = [...response.result_previews ?? [], ...response.result_attachments ?? []];
      return list.flat(1);
    }
    getPosts(res) {
      return res.results;
    }
  }
  class KemonoListPosts extends KemonoListAbstract {
    getPosts(res) {
      return res.posts;
    }
    getURL(pages, query) {
      const url = new URL(window.location.href);
      const u = new URL(`${url.origin}/api/v1/${url.pathname}`);
      if (pages > 0) {
        u.searchParams.set("o", pages.toString());
      }
      if (query) {
        u.searchParams.set("q", query);
      }
      return u.href;
    }
    getList() {
      return [];
    }
  }
  class KemonoListSinglePost extends KemonoListAbstract {
    getPosts(res) {
      if (res?.post) return [res.post];
      return [];
    }
    getURL() {
      return `${window.location.origin}/api/v1/${window.location.pathname}`;
    }
    getList(response) {
      return [...response.previews ?? [], ...response.attachments ?? []];
    }
  }
  class KemonoMatcher extends BaseMatcher {
    list;
    constructor() {
      super();
      if (window.location.href.includes("/posts")) {
        this.list = new KemonoListPosts();
      } else if (/user\/\w+/.test(window.location.href)) {
        if (/post\/\w+/.test(window.location.href)) {
          this.list = new KemonoListSinglePost();
        } else {
          this.list = new KemonoListArtist();
        }
      }
    }
    name() {
      return "Kemono";
    }
    fetchPagesSource() {
      if (!this.list) {
        throw new Error("Current path is not supported");
      }
      return this.list.next();
    }
    async parseImgNodes(results) {
      const nodes = [];
      const newImageNode = (id, user, service, path, name, server) => {
        const thumb = `https://img.kemono.su/thumbnail/data/${path}`;
        const href = `https://kemono.su/${service}/user/${user}/post/${id}`;
        let src = server ? `${server}/data/${path}?f=${name}` : void 0;
        const node = new ImageNode(thumb, href, name, void 0, src);
        if (path.indexOf(".mp4") > 1) {
          node.mimeType = "video/mp4";
          node.thumbnailSrc = "";
        }
        const ext = path.split(".").pop() ?? "";
        if (!isImage(ext)) {
          if (conf.excludeVideo || !isVideo(ext)) {
            return void 0;
          }
        }
        return node;
      };
      const chunks = [];
      for (const res of results) {
        const list = [];
        if (res.file?.path) list.push(res.file);
        list.push(...res.attachments ?? []);
        chunks.push({ res, list, needFetchPost: !list[0]?.server && list.length > 0 });
      }
      await this.batchFetchPathServerMap(chunks);
      for (const chunk of chunks) {
        for (const file of chunk.list) {
          if (!file.path) continue;
          if (!file.name || !file.server) throw new Error("cannot find image or video name and server");
          const node = newImageNode(chunk.res.id, chunk.res.user, chunk.res.service, file.path, file.name, file.server);
          if (node) nodes.push(node);
        }
      }
      return nodes;
    }
    async fetchOriginMeta(node) {
      if (!node.originSrc) throw new Error("cannot find kemono image file: " + node.href);
      return { url: node.originSrc };
    }
    workURL() {
      return /kemono.su\/(\w+\/user\/\w+(\/post\/\w+)?|posts)(\?\w=.*)?$/;
    }
    async batchFetchPathServerMap(chunks) {
      const urls = chunks.filter((chunk) => chunk.needFetchPost).map(
        (chunk) => `${window.location.origin}/api/v1/${chunk.res.service}/user/${chunk.res.user}/post/${chunk.res.id}`
      );
      const infos = await batchFetch(urls, 10, "json");
      const list = infos.reduce((list2, info) => {
        return [...list2, ...[...info.previews ?? [], ...info.attachments ?? []]];
      }, []);
      const map = kemonoInfoPathMap(list);
      chunks.filter((chunk) => chunk.needFetchPost).forEach((chunk) => chunk.list.forEach((file) => {
        if (file.path) {
          const info = map.get(file.path);
          file.name = info?.name;
          file.server = info?.server;
        }
      }));
    }
  }
  function kemonoInfoPathMap(list) {
    const map = /* @__PURE__ */ new Map();
    for (const info of list ?? []) {
      if (info.path && info.server) {
        map.set(info.path, { server: info.server, name: info.name });
      }
    }
    return map;
  }

  const REGEXP_EXTRACT_GALLERY_ID = /niyaniya.moe\/\w+\/(\d+\/\w+)/;
  const NAMESPACE_MAP = {
    0: "misc",
    1: "artist",
    2: "circle",
    7: "uploader",
    8: "male",
    9: "female",
    10: "mixed",
    11: "language"
  };
  class KoharuMatcher extends BaseMatcher {
    name() {
      return "niyaniya.moe";
    }
    meta;
    galleryMeta() {
      return this.meta || new GalleryMeta(window.location.href, "koharu-unknows");
    }
    async *fetchPagesSource(source) {
      yield Result.ok(source.source);
    }
    createMeta(detail) {
      const tags = detail.tags.reduce((map, tag) => {
        const category = NAMESPACE_MAP[tag.namespace || 0] || "misc";
        if (!map[category]) map[category] = [];
        map[category].push(tag.name);
        return map;
      }, {});
      this.meta = new GalleryMeta(window.location.href, detail.title);
      this.meta.tags = tags;
    }
    async parseImgNodes(source) {
      const matches = source.match(REGEXP_EXTRACT_GALLERY_ID);
      if (!matches || matches.length < 2) {
        throw new Error("invaild url: " + source);
      }
      const galleryID = matches[1];
      const detailAPI = `https://api.niyaniya.moe/books/detail/${galleryID}`;
      const detail = await window.fetch(detailAPI).then((res) => res.json()).then((j) => j).catch((reason) => new Error(reason.toString()));
      if (detail instanceof Error) {
        throw detail;
      }
      this.createMeta(detail);
      const [w, data] = Object.entries(detail.data).sort((a, b) => b[1].size - a[1].size).find(([_, v]) => v.id !== void 0 && v.public_key !== void 0) ?? [void 0, void 0];
      if (w === void 0 && data === void 0) throw new Error("cannot find resolution from gallery detail");
      const dataAPI = `https://api.niyaniya.moe/books/data/${galleryID}/${data.id}/${data.public_key}?v=${detail.updated_at ?? detail.created_at}&w=${w}`;
      const items = await window.fetch(dataAPI).then((res) => res.json()).then((j) => j).catch((reason) => new Error(reason.toString()));
      if (items instanceof Error) {
        throw new Error(`koharu updated their api, ${items.toString()}`);
      }
      if (items.entries.length !== detail.thumbnails.entries.length) {
        throw new Error("thumbnails length not match");
      }
      const thumbs = detail.thumbnails.entries;
      const thumbBase = detail.thumbnails.base;
      const itemBase = items.base;
      const pad = items.entries.length.toString().length;
      return items.entries.map((item, i) => {
        const href = `${window.location.origin}/reader/${galleryID}/${i + 1}`;
        const title = (i + 1).toString().padStart(pad, "0") + "." + item.path.split(".").pop();
        const src = itemBase + item.path + "?w=" + w;
        return new ImageNode(thumbBase + thumbs[i].path, href, title, void 0, src, { w: item.dimensions[0], h: item.dimensions[1] });
      });
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    // FIXME this site is no longer working
    workURL() {
      return /niyaniya.moe\/(g|reader)\/\d+\/\w+/;
    }
    headers() {
      return {
        "Referer": "https://niyaniya.moe/",
        "Origin": window.location.origin
      };
    }
  }

  class MangaCopyMatcher extends BaseMatcher {
    name() {
      return "拷贝漫画";
    }
    update_date;
    chapterCount = 0;
    meta;
    galleryMeta() {
      if (this.meta) return this.meta;
      let title = document.querySelector(".comicParticulars-title-right > ul > li > h6")?.textContent ?? document.title;
      document.querySelectorAll(".comicParticulars-title-right > ul > li > span.comicParticulars-right-txt").forEach((ele) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(ele.textContent?.trim() || "")) {
          this.update_date = ele.textContent?.trim();
        }
      });
      title += "-c" + this.chapterCount + (this.update_date ? "-" + this.update_date : "");
      this.meta = new GalleryMeta(window.location.href, title);
      return this.meta;
    }
    async *fetchPagesSource(source) {
      yield Result.ok(source.source);
    }
    async parseImgNodes(source) {
      const raw = await simpleFetch(source, "text", { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36" });
      const doc = new DOMParser().parseFromString(raw, "text/html");
      const jojoKey = raw.match(/var (jojo|ccy)\s?=\s?'(.*?)';/)?.[2];
      if (!jojoKey) throw new Error("cannot find jojoKey for decrypt :(");
      const contentKey = doc.querySelector(".imageData[contentKey]")?.getAttribute("contentKey");
      if (!contentKey) throw new Error("cannot find content key");
      try {
        const decryption = await decrypt(contentKey, jojoKey);
        const images = JSON.parse(decryption);
        const digits = images.length.toString().length;
        return images.map((img, i) => {
          return new ImageNode("", source, (i + 1).toString().padStart(digits, "0") + ".webp", void 0, img.url);
        });
      } catch (error) {
        throw new Error("cannot decrypt contentKey: " + error.toString() + "\n" + contentKey);
      }
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    workURL() {
      return /(mangacopy|copymanga).*?\/comic\/[^\/]*\/?$/;
    }
    async fetchChapters() {
      const thumbimg = document.querySelector(".comicParticulars-left-img > img[data-src]")?.getAttribute("data-src") || void 0;
      const pathWord = window.location.href.match(PATH_WORD_REGEX)?.[1];
      if (!pathWord) throw new Error("cannot match comic id");
      const comicInfoURL = `https://api.mangacopy.com/api/v3/comic2/${pathWord}?platform=1&_update=true`;
      const comicInfo = await window.fetch(comicInfoURL).then((res) => res.json()).catch((reason) => new Error(reason.toString()));
      if (comicInfo instanceof Error || !comicInfo.results.groups) throw new Error("fetch comic detail error: " + comicInfo.toString());
      if (comicInfo.code !== 200) throw new Error("fetch comic detail error: " + comicInfo.message);
      const chapters = [];
      const groups = comicInfo.results.groups;
      let chapterCount = 0;
      for (const group in groups) {
        let offset = 0;
        while (true) {
          const chaptersURL = `https://api.mangacopy.com/api/v3/comic/${pathWord}/group/${groups[group].path_word}/chapters?limit=100&offset=${offset}&_update=true`;
          const data = await window.fetch(chaptersURL).then((res) => res.json()).catch((reason) => new Error(reason.toString()));
          if (data instanceof Error) throw new Error("fetch chapters error: " + data.toString());
          if (data.code !== 200) throw new Error("fetch chaters error: " + data.message);
          const result = data.results;
          offset += result.list.length;
          for (const ch of result.list) {
            chapters.push(new Chapter(
              chapterCount++,
              group === "default" ? ch.name : `${groups[group].name}-${ch.name}`,
              // source: `https://api.mangacopy.com/api/v3/comic/${pathWord}/chapter2/${ch.uuid}?platform=1&_update=true`,
              `${window.location.origin}/comic/${pathWord}/chapter/${ch.uuid}`,
              thumbimg
            ));
          }
          if (offset >= result.total) break;
        }
      }
      return chapters;
    }
  }
  const PATH_WORD_REGEX = /\/comic\/(\w*)/;
  async function decrypt(raw, jojoKey) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const jojo = encoder.encode(jojoKey);
    const header = raw.substring(0, 16);
    const body = raw.substring(16);
    const iv = encoder.encode(header);
    const bodyBytes = new Uint8Array(
      body.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    );
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      jojo,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );
    const decryptedBytes = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      bodyBytes
    );
    return decoder.decode(decryptedBytes);
  }

  class MHGMatcher extends BaseMatcher {
    name() {
      return "漫画柜";
    }
    meta;
    chapterCount = 0;
    galleryMeta() {
      if (this.meta) return this.meta;
      let title = document.querySelector(".book-title > h1")?.textContent ?? document.title;
      title += "-c" + this.chapterCount;
      const matches = document.querySelector(".detail-list .status")?.textContent?.match(STATUS_REGEX);
      const date = matches?.[1];
      title += date ? "-" + date : "";
      const last = matches?.[2];
      title += last ? "-" + last.trim() : "";
      this.meta = new GalleryMeta(window.location.href, title);
      return this.meta;
    }
    async *fetchPagesSource(source) {
      yield Result.ok(source.source);
    }
    async parseImgNodes(source) {
      const docRaw = await window.fetch(source).then((res) => res.text());
      const matches = docRaw.match(IMG_DATA_PARAM_REGEX);
      if (!matches || matches.length < 5) throw new Error("cannot match image data");
      let data;
      try {
        data = parseImgData(matches[1], parseInt(matches[2]), parseInt(matches[3]), matches[4]);
      } catch (error) {
        throw new Error("cannot parse image data: " + error.toString());
      }
      const server = getServer();
      return data.files.map((f, i) => {
        const src = `${server}/${data.path}/${f}?e=${data.sl.e}&m=${data.sl.m}}`;
        const href = `https://www.manhuagui.com/comic/${data.bid}/${data.cid}.html#p=${i + 1}`;
        return new ImageNode("", href, f, void 0, src);
      });
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    workURL() {
      return /manhuagui.com\/comic\/\d+\/?$/;
    }
    async fetchChapters() {
      const thumbimg = document.querySelector(".book-cover img")?.src;
      const chapters = [];
      document.querySelectorAll(".chapter-list").forEach((element) => {
        let prefix = findSibling(element, "prev", (e) => e.tagName.toLowerCase() === "h4")?.firstElementChild?.textContent ?? void 0;
        prefix = prefix ? prefix + "-" : "";
        element.querySelectorAll("ul").forEach((ul) => {
          const ret = Array.from(ul.querySelectorAll("li > a")).reverse().map(
            (element2) => new Chapter(0, prefix + element2.title, element2.href, thumbimg)
          );
          chapters.push(...ret);
        });
      });
      chapters.forEach((ch, i) => ch.id = i + 1);
      return chapters;
    }
  }
  function findSibling(element, dir, eq) {
    const sibling = (e2) => e2.previousElementSibling ;
    let e = element;
    while (e = sibling(e)) {
      if (eq(e)) return e;
    }
    return null;
  }
  const MHG_SERVERS = [
    {
      name: "自动",
      hosts: [
        {
          h: "i",
          w: 0.1
        },
        {
          h: "eu",
          w: 5
        },
        {
          h: "eu1",
          w: 5
        },
        {
          h: "us",
          w: 1
        },
        {
          h: "us1",
          w: 1
        },
        {
          h: "us2",
          w: 1
        },
        {
          h: "us3",
          w: 1
        }
      ]
    },
    {
      name: "电信",
      hosts: [
        {
          h: "eu",
          w: 1
        },
        {
          h: "eu1",
          w: 1
        }
      ]
    },
    {
      name: "联通",
      hosts: [
        {
          h: "us",
          w: 1
        },
        {
          h: "us1",
          w: 1
        },
        {
          h: "us2",
          w: 1
        },
        {
          h: "us3",
          w: 1
        }
      ]
    }
  ];
  function getServer() {
    const serv = parseInt(window.localStorage.getItem("") ?? "0");
    const host = parseInt(window.localStorage.getItem("") ?? "0");
    const prefix = MHG_SERVERS[serv]?.hosts[host]?.h ?? "us1";
    return `https://${prefix}.hamreus.com`;
  }
  const STATUS_REGEX = /\[(\d{4}-\d{2}-\d{2})\].*?\[(.*?)\]/;
  const IMG_DATA_PARAM_REGEX = /\('\w+\.\w+\((.*?)\).*?,(\d+),(\d+),'(.*?)'\[/;
  function decompressFromBase64(input) {
    return LZString.decompressFromBase64(input);
  }
  function parseImgData(tamplate, a, c, raw) {
    const keys = decompressFromBase64(raw).split("|");
    const d = {};
    function e(n) {
      const aa = n < a ? "" : e(Math.floor(n / a)).toString();
      const bb = (n = n % a) > 35 ? String.fromCharCode(n + 29) : n.toString(36);
      return aa + bb;
    }
    while (c--) {
      d[e(c)] = keys[c] || e(c);
    }
    const dataStr = tamplate.replace(new RegExp("\\b\\w+\\b", "g"), (key) => d[key]);
    return JSON.parse(dataStr);
  }

  class MiniServeMatcher extends BaseMatcher {
    map = /* @__PURE__ */ new Map();
    currentDirectorMedias = [];
    name() {
      return "Mini Serve";
    }
    async fetchChapters() {
      const list = Array.from(document.querySelectorAll("table tbody a.file"));
      const chapters = [];
      let id = 1;
      for (const a of list) {
        const href = a.href;
        const ext = href.split(".").pop()?.toLowerCase();
        if (ext === "zip") {
          chapters.push(new Chapter(id, a.textContent ?? "unknown-" + id, href));
          id++;
        } else if (isImage(ext ?? "") || isVideo(ext ?? "")) {
          const node = new ImageNode(a.href, a.href, a.textContent ?? "", void 0, a.href);
          if (isImage(ext)) {
            node.mimeType = "image/" + ext;
          } else if (isVideo(ext)) {
            node.mimeType = "video/" + ext;
          }
          this.currentDirectorMedias.push(node);
        }
      }
      if (this.currentDirectorMedias.length > 0) {
        chapters.unshift(new Chapter(0, "Current Directory", ""));
      }
      if (chapters.length === 0) throw new Error("can not found zip files or current directory has empty image list");
      return chapters;
    }
    async *fetchPagesSource(source) {
      yield Result.ok(source.source);
    }
    async parseImgNodes(href, chapterID) {
      if (!href && this.currentDirectorMedias.length > 0) return this.currentDirectorMedias;
      const blob = await window.fetch(href).then((res) => res.blob());
      const zipReader = new zip_js__namespace.ZipReader(new zip_js__namespace.BlobReader(blob));
      const entries = await zipReader.getEntries();
      const map = /* @__PURE__ */ new Map();
      this.map.set(chapterID, map);
      return entries.filter(
        (e) => {
          const ext = (e.filename.split(".").pop() ?? "jpg").toLowerCase();
          return isImage(ext) || isVideo(ext);
        }
      ).map((e) => {
        const promise = e.getData(new zip_js__namespace.BlobWriter());
        map.set(e.filename, promise);
        const ext = (e.filename.split(".").pop() ?? "jpg").toLowerCase();
        const node = new ImageNode("", e.filename, e.filename, void 0);
        if (isImage(ext)) {
          node.mimeType = "image/" + ext;
        } else if (isVideo(ext)) {
          node.mimeType = "video/" + ext;
        }
        return node;
      });
    }
    async fetchOriginMeta(node, _retry, chapterID) {
      if (node.originSrc) {
        return { url: node.originSrc };
      }
      const dataPromise = this.map.get(chapterID)?.get(node.href);
      if (!dataPromise) throw new Error("cannot read image from zip");
      const data = await dataPromise;
      return { url: URL.createObjectURL(data) };
    }
    async processData(data, _contentType, node) {
      return [data, node.mimeType];
    }
    workURL() {
      return /.*:41021/;
    }
  }

  class MyComicMatcher extends BaseMatcher {
    meta;
    name() {
      return "My Comic";
    }
    workURL() {
      return /mycomic.com\/(\w+\/)?comics\/\d+$/;
    }
    galleryMeta(chapter) {
      return this.meta ?? super.galleryMeta(chapter);
    }
    initGalleryMeta() {
      const title = document.querySelector(".grow > div[data-flux-heading]")?.textContent ?? document.title;
      this.meta = new GalleryMeta(window.location.href, title);
    }
    async fetchChapters() {
      this.initGalleryMeta();
      const volumes = Array.from(document.querySelectorAll(".mt-8.mb-12 > div[x-data]"));
      const result = [];
      for (const vol of volumes) {
        let raw = vol.getAttribute("x-data");
        if (raw) {
          raw = raw.replace(/,\n\s*toggleSorting\(\) \{.*?\},/gms, "");
          raw = raw.replaceAll(/(chapters|decending)/g, '"$1"');
        }
        const data = JSON.parse(raw ?? "{}");
        let volName = vol.querySelector(".text-lg > div")?.textContent ?? "";
        volName = volName ? volName + "-" : "";
        if (!data.chapters) continue;
        const chs = data.chapters.map(
          (ch) => new Chapter(ch.id, volName + ch.title, `https://mycomic.com/cn/chapters/${ch.id}`)
        );
        result.push(...chs);
      }
      return result;
    }
    async *fetchPagesSource(ch) {
      const doc = await window.fetch(ch.source).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
      yield Result.ok(doc);
    }
    async parseImgNodes(doc, _chapterID) {
      const imgs = Array.from(doc.querySelectorAll(".\\-mx-6 > img[x-ref]"));
      const imgNodes = [];
      const digits = imgs.length.toString().length;
      for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        const src = img.getAttribute("src") || img.getAttribute("data-src");
        if (!src) {
          evLog("error", `cannot find imgage src, `, img);
          continue;
        }
        const ext = src.split(".").pop();
        const title = (i + 1).toString().padStart(digits, "0") + "." + ext;
        imgNodes.push(new ImageNode("", src, title, void 0, src, { w: img.width, h: img.height }));
      }
      return imgNodes;
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function nhParseExt(str) {
    switch (str.slice(0, 1)) {
      case "j":
        return "jpg";
      case "g":
        return "gif";
      case "p":
        return "png";
      case "w":
        return "webp";
      case "a":
        return "avif";
      case "m":
        return "mp4";
      default:
        throw new Error("cannot parse image extension from info: " + str);
    }
  }
  class NHMatcher extends BaseMatcher {
    meta;
    name() {
      return "nhentai";
    }
    workURL() {
      return /nhentai.net\/g\/\d+\/?$/;
    }
    galleryMeta() {
      return this.meta;
    }
    parseInfo() {
      const mediaServer = Array.from(document.querySelectorAll("body > script")).find((ele) => ele.textContent?.trim()?.startsWith("window._n_app"))?.textContent?.match(/media_server:\s?(\d+)/)?.[1];
      if (!mediaServer) throw new Error("cannot find media server");
      const raw = Array.from(document.querySelectorAll("body > script")).find((ele) => ele.textContent?.trim()?.startsWith("window._gallery"))?.textContent?.match(/parse\((.*)\);/)?.[1];
      if (!raw) throw new Error("cannot find images info");
      const info = JSON.parse(JSON.parse(raw));
      const meta = new GalleryMeta(window.location.href, info.title.english);
      meta.originTitle = info.title.japanese;
      meta.tags = info.tags.reduce((prev, curr) => {
        if (!prev[curr.type]) {
          prev[curr.type] = [];
        }
        prev[curr.type].push(curr.name);
        return prev;
      }, {});
      this.meta = meta;
      return { info, mediaServer };
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    async parseImgNodes(doc) {
      await sleep(200);
      const nodes = Array.from(doc.querySelectorAll(".thumb-container > .gallerythumb") ?? []);
      if (nodes.length == 0) throw new Error("cannot find image nodes");
      const { info, mediaServer } = this.parseInfo();
      const mediaID = info.media_id;
      const digits = nodes.length.toString().length;
      const ret = [];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const thumbSrc = node.querySelector("img")?.getAttribute("data-src") ?? "";
        const title = (i + 1).toString().padStart(digits, "0");
        const ext = nhParseExt(info.images.pages[i].t);
        const href = location.origin + node.getAttribute("href");
        const originSrc = `${window.location.origin.replace("//", "//i" + mediaServer + ".")}/galleries/${mediaID}/${i + 1}.${ext}`;
        const wh = { w: info.images.pages[i].w, h: info.images.pages[i].h };
        ret.push(new ImageNode(thumbSrc, href, title + "." + ext, void 0, originSrc, wh));
      }
      return ret;
    }
    async *fetchPagesSource() {
      yield Result.ok(document);
    }
  }
  class NHxxxMatcher extends BaseMatcher {
    meta;
    galleryMeta() {
      return this.meta;
    }
    name() {
      return "nhentai.xxx";
    }
    parseMeta() {
      const title = document.querySelector(".info h1")?.textContent;
      const originTItle = document.querySelector(".info h2")?.textContent;
      const meta = new GalleryMeta(window.location.href, title ?? document.title);
      meta.originTitle = originTItle ?? void 0;
      Array.from(document.querySelectorAll(".info > ul > li.tags")).forEach((ele) => {
        let cat = ele.querySelector("span.text")?.textContent ?? "misc";
        cat = cat.trim().replace(":", "");
        const tags = Array.from(ele.querySelectorAll("a.tag_btn > .tag_name")).map((t) => t.textContent?.trim()).filter(Boolean);
        meta.tags[cat] = tags;
      });
      this.meta = meta;
    }
    async *fetchPagesSource() {
      this.parseMeta();
      yield Result.ok(document);
    }
    async parseImgNodes(page) {
      const doc = page;
      await sleep(200);
      const [files, thumbs] = this.parseInfo(doc);
      if (files.length !== thumbs.length) throw new Error("thumbs length not eq images length");
      const cover = doc.querySelector(".cover img")?.src;
      if (!cover) throw new Error("cannot find cover src");
      const base = cover.slice(0, cover.lastIndexOf("/") + 1);
      const ret = [];
      const digits = files.length.toString().length;
      let href = window.location.href;
      if (href.endsWith("/")) href = href.slice(0, -1);
      for (let i = 0; i < files.length; i++) {
        const title = (i + 1).toString().padStart(digits, "0");
        const thumb = thumbs[i];
        const thumbSrc = base + thumb[0] + "." + nhParseExt(thumb[1]);
        const file = files[i];
        const originSrc = base + file[0] + "." + nhParseExt(file[1]);
        const splits = file[1].split(",");
        let wh = void 0;
        if (splits.length === 3) {
          wh = { w: parseInt(splits[1].trim()), h: parseInt(splits[2].trim()) };
        }
        ret.push(new ImageNode(thumbSrc, href + "/" + (i + 1), title + "." + nhParseExt(file[1]), void 0, originSrc, wh));
      }
      return ret;
    }
    parseInfo(doc) {
      const matches = Array.from(doc.querySelectorAll("script[type]")).find((ele) => ele.textContent?.trimStart().startsWith("var g_th"))?.textContent?.match(/\('(.*)'\);/);
      if (!matches || matches.length !== 2) throw new Error("cannot find images info from script");
      const info = JSON.parse(matches[1]);
      const files = Object.entries(info.fl);
      const thumbs = Object.entries(info.th);
      return [files, thumbs];
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    workURL() {
      return /nhentai.xxx\/g\/\d+\/?$/;
    }
  }

  var FFMessageType;
  (function (FFMessageType) {
      FFMessageType["LOAD"] = "LOAD";
      FFMessageType["EXEC"] = "EXEC";
      FFMessageType["FFPROBE"] = "FFPROBE";
      FFMessageType["WRITE_FILE"] = "WRITE_FILE";
      FFMessageType["READ_FILE"] = "READ_FILE";
      FFMessageType["DELETE_FILE"] = "DELETE_FILE";
      FFMessageType["RENAME"] = "RENAME";
      FFMessageType["CREATE_DIR"] = "CREATE_DIR";
      FFMessageType["LIST_DIR"] = "LIST_DIR";
      FFMessageType["DELETE_DIR"] = "DELETE_DIR";
      FFMessageType["ERROR"] = "ERROR";
      FFMessageType["DOWNLOAD"] = "DOWNLOAD";
      FFMessageType["PROGRESS"] = "PROGRESS";
      FFMessageType["LOG"] = "LOG";
      FFMessageType["MOUNT"] = "MOUNT";
      FFMessageType["UNMOUNT"] = "UNMOUNT";
  })(FFMessageType || (FFMessageType = {}));

  /**
   * Generate an unique message ID.
   */
  const getMessageID = (() => {
      let messageID = 0;
      return () => messageID++;
  })();

  const ERROR_NOT_LOADED = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first");
  const ERROR_TERMINATED = new Error("called FFmpeg.terminate()");

  const encodedJs = "KGZ1bmN0aW9uICgpIHsKICAgICd1c2Ugc3RyaWN0JzsKCiAgICBjb25zdCBDT1JFX1ZFUlNJT04gPSAiMC4xMi42IjsKICAgIGNvbnN0IENPUkVfVVJMID0gYGh0dHBzOi8vdW5wa2cuY29tL0BmZm1wZWcvY29yZUAke0NPUkVfVkVSU0lPTn0vZGlzdC91bWQvZmZtcGVnLWNvcmUuanNgOwogICAgdmFyIEZGTWVzc2FnZVR5cGU7CiAgICAoZnVuY3Rpb24gKEZGTWVzc2FnZVR5cGUpIHsKICAgICAgICBGRk1lc3NhZ2VUeXBlWyJMT0FEIl0gPSAiTE9BRCI7CiAgICAgICAgRkZNZXNzYWdlVHlwZVsiRVhFQyJdID0gIkVYRUMiOwogICAgICAgIEZGTWVzc2FnZVR5cGVbIldSSVRFX0ZJTEUiXSA9ICJXUklURV9GSUxFIjsKICAgICAgICBGRk1lc3NhZ2VUeXBlWyJSRUFEX0ZJTEUiXSA9ICJSRUFEX0ZJTEUiOwogICAgICAgIEZGTWVzc2FnZVR5cGVbIkRFTEVURV9GSUxFIl0gPSAiREVMRVRFX0ZJTEUiOwogICAgICAgIEZGTWVzc2FnZVR5cGVbIlJFTkFNRSJdID0gIlJFTkFNRSI7CiAgICAgICAgRkZNZXNzYWdlVHlwZVsiQ1JFQVRFX0RJUiJdID0gIkNSRUFURV9ESVIiOwogICAgICAgIEZGTWVzc2FnZVR5cGVbIkxJU1RfRElSIl0gPSAiTElTVF9ESVIiOwogICAgICAgIEZGTWVzc2FnZVR5cGVbIkRFTEVURV9ESVIiXSA9ICJERUxFVEVfRElSIjsKICAgICAgICBGRk1lc3NhZ2VUeXBlWyJFUlJPUiJdID0gIkVSUk9SIjsKICAgICAgICBGRk1lc3NhZ2VUeXBlWyJET1dOTE9BRCJdID0gIkRPV05MT0FEIjsKICAgICAgICBGRk1lc3NhZ2VUeXBlWyJQUk9HUkVTUyJdID0gIlBST0dSRVNTIjsKICAgICAgICBGRk1lc3NhZ2VUeXBlWyJMT0ciXSA9ICJMT0ciOwogICAgICAgIEZGTWVzc2FnZVR5cGVbIk1PVU5UIl0gPSAiTU9VTlQiOwogICAgICAgIEZGTWVzc2FnZVR5cGVbIlVOTU9VTlQiXSA9ICJVTk1PVU5UIjsKICAgIH0pKEZGTWVzc2FnZVR5cGUgfHwgKEZGTWVzc2FnZVR5cGUgPSB7fSkpOwoKICAgIGNvbnN0IEVSUk9SX1VOS05PV05fTUVTU0FHRV9UWVBFID0gbmV3IEVycm9yKCJ1bmtub3duIG1lc3NhZ2UgdHlwZSIpOwogICAgY29uc3QgRVJST1JfTk9UX0xPQURFRCA9IG5ldyBFcnJvcigiZmZtcGVnIGlzIG5vdCBsb2FkZWQsIGNhbGwgYGF3YWl0IGZmbXBlZy5sb2FkKClgIGZpcnN0Iik7CiAgICBjb25zdCBFUlJPUl9JTVBPUlRfRkFJTFVSRSA9IG5ldyBFcnJvcigiZmFpbGVkIHRvIGltcG9ydCBmZm1wZWctY29yZS5qcyIpOwoKICAgIC8vLyA8cmVmZXJlbmNlIG5vLWRlZmF1bHQtbGliPSJ0cnVlIiAvPgogICAgLy8vIDxyZWZlcmVuY2UgbGliPSJlc25leHQiIC8+CiAgICAvLy8gPHJlZmVyZW5jZSBsaWI9IndlYndvcmtlciIgLz4KICAgIGxldCBmZm1wZWc7CiAgICBjb25zdCBsb2FkID0gYXN5bmMgKHsgY29yZVVSTDogX2NvcmVVUkwsIHdhc21VUkw6IF93YXNtVVJMLCB3b3JrZXJVUkw6IF93b3JrZXJVUkwsIH0pID0+IHsKICAgICAgICBjb25zdCBmaXJzdCA9ICFmZm1wZWc7CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgaWYgKCFfY29yZVVSTCkKICAgICAgICAgICAgICAgIF9jb3JlVVJMID0gQ09SRV9VUkw7CiAgICAgICAgICAgIC8vIHdoZW4gd2ViIHdvcmtlciB0eXBlIGlzIGBjbGFzc2ljYC4KICAgICAgICAgICAgaW1wb3J0U2NyaXB0cyhfY29yZVVSTCk7CiAgICAgICAgfQogICAgICAgIGNhdGNoIHsKICAgICAgICAgICAgaWYgKCFfY29yZVVSTCkKICAgICAgICAgICAgICAgIF9jb3JlVVJMID0gQ09SRV9VUkwucmVwbGFjZSgnL3VtZC8nLCAnL2VzbS8nKTsKICAgICAgICAgICAgLy8gd2hlbiB3ZWIgd29ya2VyIHR5cGUgaXMgYG1vZHVsZWAuCiAgICAgICAgICAgIHNlbGYuY3JlYXRlRkZtcGVnQ29yZSA9IChhd2FpdCBpbXBvcnQoCiAgICAgICAgICAgIC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gLyogQHZpdGUtaWdub3JlICovIF9jb3JlVVJMKSkuZGVmYXVsdDsKICAgICAgICAgICAgaWYgKCFzZWxmLmNyZWF0ZUZGbXBlZ0NvcmUpIHsKICAgICAgICAgICAgICAgIHRocm93IEVSUk9SX0lNUE9SVF9GQUlMVVJFOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGNvbnN0IGNvcmVVUkwgPSBfY29yZVVSTDsKICAgICAgICBjb25zdCB3YXNtVVJMID0gX3dhc21VUkwgPyBfd2FzbVVSTCA6IF9jb3JlVVJMLnJlcGxhY2UoLy5qcyQvZywgIi53YXNtIik7CiAgICAgICAgY29uc3Qgd29ya2VyVVJMID0gX3dvcmtlclVSTAogICAgICAgICAgICA/IF93b3JrZXJVUkwKICAgICAgICAgICAgOiBfY29yZVVSTC5yZXBsYWNlKC8uanMkL2csICIud29ya2VyLmpzIik7CiAgICAgICAgZmZtcGVnID0gYXdhaXQgc2VsZi5jcmVhdGVGRm1wZWdDb3JlKHsKICAgICAgICAgICAgLy8gRml4IGBPdmVybG9hZCByZXNvbHV0aW9uIGZhaWxlZC5gIHdoZW4gdXNpbmcgbXVsdGktdGhyZWFkZWQgZmZtcGVnLWNvcmUuCiAgICAgICAgICAgIC8vIEVuY29kZWQgd2FzbVVSTCBhbmQgd29ya2VyVVJMIGluIHRoZSBVUkwgYXMgYSBoYWNrIHRvIGZpeCBsb2NhdGVGaWxlIGlzc3VlLgogICAgICAgICAgICBtYWluU2NyaXB0VXJsT3JCbG9iOiBgJHtjb3JlVVJMfSMke2J0b2EoSlNPTi5zdHJpbmdpZnkoeyB3YXNtVVJMLCB3b3JrZXJVUkwgfSkpfWAsCiAgICAgICAgfSk7CiAgICAgICAgZmZtcGVnLnNldExvZ2dlcigoZGF0YSkgPT4gc2VsZi5wb3N0TWVzc2FnZSh7IHR5cGU6IEZGTWVzc2FnZVR5cGUuTE9HLCBkYXRhIH0pKTsKICAgICAgICBmZm1wZWcuc2V0UHJvZ3Jlc3MoKGRhdGEpID0+IHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICB0eXBlOiBGRk1lc3NhZ2VUeXBlLlBST0dSRVNTLAogICAgICAgICAgICBkYXRhLAogICAgICAgIH0pKTsKICAgICAgICByZXR1cm4gZmlyc3Q7CiAgICB9OwogICAgY29uc3QgZXhlYyA9ICh7IGFyZ3MsIHRpbWVvdXQgPSAtMSB9KSA9PiB7CiAgICAgICAgZmZtcGVnLnNldFRpbWVvdXQodGltZW91dCk7CiAgICAgICAgZmZtcGVnLmV4ZWMoLi4uYXJncyk7CiAgICAgICAgY29uc3QgcmV0ID0gZmZtcGVnLnJldDsKICAgICAgICBmZm1wZWcucmVzZXQoKTsKICAgICAgICByZXR1cm4gcmV0OwogICAgfTsKICAgIGNvbnN0IHdyaXRlRmlsZSA9ICh7IHBhdGgsIGRhdGEgfSkgPT4gewogICAgICAgIGZmbXBlZy5GUy53cml0ZUZpbGUocGF0aCwgZGF0YSk7CiAgICAgICAgcmV0dXJuIHRydWU7CiAgICB9OwogICAgY29uc3QgcmVhZEZpbGUgPSAoeyBwYXRoLCBlbmNvZGluZyB9KSA9PiBmZm1wZWcuRlMucmVhZEZpbGUocGF0aCwgeyBlbmNvZGluZyB9KTsKICAgIC8vIFRPRE86IGNoZWNrIGlmIGRlbGV0aW9uIHdvcmtzLgogICAgY29uc3QgZGVsZXRlRmlsZSA9ICh7IHBhdGggfSkgPT4gewogICAgICAgIGZmbXBlZy5GUy51bmxpbmsocGF0aCk7CiAgICAgICAgcmV0dXJuIHRydWU7CiAgICB9OwogICAgY29uc3QgcmVuYW1lID0gKHsgb2xkUGF0aCwgbmV3UGF0aCB9KSA9PiB7CiAgICAgICAgZmZtcGVnLkZTLnJlbmFtZShvbGRQYXRoLCBuZXdQYXRoKTsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgIH07CiAgICAvLyBUT0RPOiBjaGVjayBpZiBjcmVhdGlvbiB3b3Jrcy4KICAgIGNvbnN0IGNyZWF0ZURpciA9ICh7IHBhdGggfSkgPT4gewogICAgICAgIGZmbXBlZy5GUy5ta2RpcihwYXRoKTsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgIH07CiAgICBjb25zdCBsaXN0RGlyID0gKHsgcGF0aCB9KSA9PiB7CiAgICAgICAgY29uc3QgbmFtZXMgPSBmZm1wZWcuRlMucmVhZGRpcihwYXRoKTsKICAgICAgICBjb25zdCBub2RlcyA9IFtdOwogICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBuYW1lcykgewogICAgICAgICAgICBjb25zdCBzdGF0ID0gZmZtcGVnLkZTLnN0YXQoYCR7cGF0aH0vJHtuYW1lfWApOwogICAgICAgICAgICBjb25zdCBpc0RpciA9IGZmbXBlZy5GUy5pc0RpcihzdGF0Lm1vZGUpOwogICAgICAgICAgICBub2Rlcy5wdXNoKHsgbmFtZSwgaXNEaXIgfSk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBub2RlczsKICAgIH07CiAgICAvLyBUT0RPOiBjaGVjayBpZiBkZWxldGlvbiB3b3Jrcy4KICAgIGNvbnN0IGRlbGV0ZURpciA9ICh7IHBhdGggfSkgPT4gewogICAgICAgIGZmbXBlZy5GUy5ybWRpcihwYXRoKTsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgIH07CiAgICBjb25zdCBtb3VudCA9ICh7IGZzVHlwZSwgb3B0aW9ucywgbW91bnRQb2ludCB9KSA9PiB7CiAgICAgICAgY29uc3Qgc3RyID0gZnNUeXBlOwogICAgICAgIGNvbnN0IGZzID0gZmZtcGVnLkZTLmZpbGVzeXN0ZW1zW3N0cl07CiAgICAgICAgaWYgKCFmcykKICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgIGZmbXBlZy5GUy5tb3VudChmcywgb3B0aW9ucywgbW91bnRQb2ludCk7CiAgICAgICAgcmV0dXJuIHRydWU7CiAgICB9OwogICAgY29uc3QgdW5tb3VudCA9ICh7IG1vdW50UG9pbnQgfSkgPT4gewogICAgICAgIGZmbXBlZy5GUy51bm1vdW50KG1vdW50UG9pbnQpOwogICAgICAgIHJldHVybiB0cnVlOwogICAgfTsKICAgIHNlbGYub25tZXNzYWdlID0gYXN5bmMgKHsgZGF0YTogeyBpZCwgdHlwZSwgZGF0YTogX2RhdGEgfSwgfSkgPT4gewogICAgICAgIGNvbnN0IHRyYW5zID0gW107CiAgICAgICAgbGV0IGRhdGE7CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgaWYgKHR5cGUgIT09IEZGTWVzc2FnZVR5cGUuTE9BRCAmJiAhZmZtcGVnKQogICAgICAgICAgICAgICAgdGhyb3cgRVJST1JfTk9UX0xPQURFRDsgLy8gZXNsaW50LWRpc2FibGUtbGluZQogICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHsKICAgICAgICAgICAgICAgIGNhc2UgRkZNZXNzYWdlVHlwZS5MT0FEOgogICAgICAgICAgICAgICAgICAgIGRhdGEgPSBhd2FpdCBsb2FkKF9kYXRhKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgRkZNZXNzYWdlVHlwZS5FWEVDOgogICAgICAgICAgICAgICAgICAgIGRhdGEgPSBleGVjKF9kYXRhKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgRkZNZXNzYWdlVHlwZS5XUklURV9GSUxFOgogICAgICAgICAgICAgICAgICAgIGRhdGEgPSB3cml0ZUZpbGUoX2RhdGEpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSBGRk1lc3NhZ2VUeXBlLlJFQURfRklMRToKICAgICAgICAgICAgICAgICAgICBkYXRhID0gcmVhZEZpbGUoX2RhdGEpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSBGRk1lc3NhZ2VUeXBlLkRFTEVURV9GSUxFOgogICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkZWxldGVGaWxlKF9kYXRhKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgRkZNZXNzYWdlVHlwZS5SRU5BTUU6CiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHJlbmFtZShfZGF0YSk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlIEZGTWVzc2FnZVR5cGUuQ1JFQVRFX0RJUjoKICAgICAgICAgICAgICAgICAgICBkYXRhID0gY3JlYXRlRGlyKF9kYXRhKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgRkZNZXNzYWdlVHlwZS5MSVNUX0RJUjoKICAgICAgICAgICAgICAgICAgICBkYXRhID0gbGlzdERpcihfZGF0YSk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlIEZGTWVzc2FnZVR5cGUuREVMRVRFX0RJUjoKICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGVsZXRlRGlyKF9kYXRhKTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgRkZNZXNzYWdlVHlwZS5NT1VOVDoKICAgICAgICAgICAgICAgICAgICBkYXRhID0gbW91bnQoX2RhdGEpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSBGRk1lc3NhZ2VUeXBlLlVOTU9VTlQ6CiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHVubW91bnQoX2RhdGEpOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICAgICAgICB0aHJvdyBFUlJPUl9VTktOT1dOX01FU1NBR0VfVFlQRTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBjYXRjaCAoZSkgewogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgIGlkLAogICAgICAgICAgICAgICAgdHlwZTogRkZNZXNzYWdlVHlwZS5FUlJPUiwKICAgICAgICAgICAgICAgIGRhdGE6IGUudG9TdHJpbmcoKSwKICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICB9CiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7CiAgICAgICAgICAgIHRyYW5zLnB1c2goZGF0YS5idWZmZXIpOwogICAgICAgIH0KICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgaWQsIHR5cGUsIGRhdGEgfSwgdHJhbnMpOwogICAgfTsKCn0pKCk7Cg==";
  const decodeBase64 = (base64) => Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  const _classWorkerURL = URL.createObjectURL(new Blob([decodeBase64(encodedJs)], { type: 'text/javascript' }));/**
   * Provides APIs to interact with ffmpeg web worker.
   *
   * @example
   * ```ts
   * const ffmpeg = new FFmpeg();
   * ```
   */
  class FFmpeg {
      #worker = null;
      /**
       * #resolves and #rejects tracks Promise resolves and rejects to
       * be called when we receive message from web worker.
       */
      #resolves = {};
      #rejects = {};
      #logEventCallbacks = [];
      #progressEventCallbacks = [];
      loaded = false;
      /**
       * register worker message event handlers.
       */
      #registerHandlers = () => {
          if (this.#worker) {
              this.#worker.onmessage = ({ data: { id, type, data }, }) => {
                  switch (type) {
                      case FFMessageType.LOAD:
                          this.loaded = true;
                          this.#resolves[id](data);
                          break;
                      case FFMessageType.MOUNT:
                      case FFMessageType.UNMOUNT:
                      case FFMessageType.EXEC:
                      case FFMessageType.FFPROBE:
                      case FFMessageType.WRITE_FILE:
                      case FFMessageType.READ_FILE:
                      case FFMessageType.DELETE_FILE:
                      case FFMessageType.RENAME:
                      case FFMessageType.CREATE_DIR:
                      case FFMessageType.LIST_DIR:
                      case FFMessageType.DELETE_DIR:
                          this.#resolves[id](data);
                          break;
                      case FFMessageType.LOG:
                          this.#logEventCallbacks.forEach((f) => f(data));
                          break;
                      case FFMessageType.PROGRESS:
                          this.#progressEventCallbacks.forEach((f) => f(data));
                          break;
                      case FFMessageType.ERROR:
                          this.#rejects[id](data);
                          break;
                  }
                  delete this.#resolves[id];
                  delete this.#rejects[id];
              };
          }
      };
      /**
       * Generic function to send messages to web worker.
       */
      #send = ({ type, data }, trans = [], signal) => {
          if (!this.#worker) {
              return Promise.reject(ERROR_NOT_LOADED);
          }
          return new Promise((resolve, reject) => {
              const id = getMessageID();
              this.#worker && this.#worker.postMessage({ id, type, data }, trans);
              this.#resolves[id] = resolve;
              this.#rejects[id] = reject;
              signal?.addEventListener("abort", () => {
                  reject(new DOMException(`Message # ${id} was aborted`, "AbortError"));
              }, { once: true });
          });
      };
      on(event, callback) {
          if (event === "log") {
              this.#logEventCallbacks.push(callback);
          }
          else if (event === "progress") {
              this.#progressEventCallbacks.push(callback);
          }
      }
      off(event, callback) {
          if (event === "log") {
              this.#logEventCallbacks = this.#logEventCallbacks.filter((f) => f !== callback);
          }
          else if (event === "progress") {
              this.#progressEventCallbacks = this.#progressEventCallbacks.filter((f) => f !== callback);
          }
      }
      /**
       * Loads ffmpeg-core inside web worker. It is required to call this method first
       * as it initializes WebAssembly and other essential variables.
       *
       * @category FFmpeg
       * @returns `true` if ffmpeg core is loaded for the first time.
       */
      load = ({ classWorkerURL, ...config } = {}, { signal } = {}) => {
          if (!this.#worker) {
              this.#worker = classWorkerURL ?
                  new Worker(new URL(classWorkerURL, (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href)), {
                      type: "module",
                  }) :
                  // We need to duplicated the code here to enable webpack
                  // to bundle worekr.js here.
                  new Worker(new URL(_classWorkerURL, (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href)), {
                      type: "module",
                  });
              this.#registerHandlers();
          }
          return this.#send({
              type: FFMessageType.LOAD,
              data: config,
          }, undefined, signal);
      };
      /**
       * Execute ffmpeg command.
       *
       * @remarks
       * To avoid common I/O issues, ["-nostdin", "-y"] are prepended to the args
       * by default.
       *
       * @example
       * ```ts
       * const ffmpeg = new FFmpeg();
       * await ffmpeg.load();
       * await ffmpeg.writeFile("video.avi", ...);
       * // ffmpeg -i video.avi video.mp4
       * await ffmpeg.exec(["-i", "video.avi", "video.mp4"]);
       * const data = ffmpeg.readFile("video.mp4");
       * ```
       *
       * @returns `0` if no error, `!= 0` if timeout (1) or error.
       * @category FFmpeg
       */
      exec = (
      /** ffmpeg command line args */
      args, 
      /**
       * milliseconds to wait before stopping the command execution.
       *
       * @defaultValue -1
       */
      timeout = -1, { signal } = {}) => this.#send({
          type: FFMessageType.EXEC,
          data: { args, timeout },
      }, undefined, signal);
      /**
       * Execute ffprobe command.
       *
       * @example
       * ```ts
       * const ffmpeg = new FFmpeg();
       * await ffmpeg.load();
       * await ffmpeg.writeFile("video.avi", ...);
       * // Getting duration of a video in seconds: ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 video.avi -o output.txt
       * await ffmpeg.ffprobe(["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", "video.avi", "-o", "output.txt"]);
       * const data = ffmpeg.readFile("output.txt");
       * ```
       *
       * @returns `0` if no error, `!= 0` if timeout (1) or error.
       * @category FFmpeg
       */
      ffprobe = (
      /** ffprobe command line args */
      args, 
      /**
       * milliseconds to wait before stopping the command execution.
       *
       * @defaultValue -1
       */
      timeout = -1, { signal } = {}) => this.#send({
          type: FFMessageType.FFPROBE,
          data: { args, timeout },
      }, undefined, signal);
      /**
       * Terminate all ongoing API calls and terminate web worker.
       * `FFmpeg.load()` must be called again before calling any other APIs.
       *
       * @category FFmpeg
       */
      terminate = () => {
          const ids = Object.keys(this.#rejects);
          // rejects all incomplete Promises.
          for (const id of ids) {
              this.#rejects[id](ERROR_TERMINATED);
              delete this.#rejects[id];
              delete this.#resolves[id];
          }
          if (this.#worker) {
              this.#worker.terminate();
              this.#worker = null;
              this.loaded = false;
          }
      };
      /**
       * Write data to ffmpeg.wasm.
       *
       * @example
       * ```ts
       * const ffmpeg = new FFmpeg();
       * await ffmpeg.load();
       * await ffmpeg.writeFile("video.avi", await fetchFile("../video.avi"));
       * await ffmpeg.writeFile("text.txt", "hello world");
       * ```
       *
       * @category File System
       */
      writeFile = (path, data, { signal } = {}) => {
          const trans = [];
          if (data instanceof Uint8Array) {
              trans.push(data.buffer);
          }
          return this.#send({
              type: FFMessageType.WRITE_FILE,
              data: { path, data },
          }, trans, signal);
      };
      mount = (fsType, options, mountPoint) => {
          const trans = [];
          return this.#send({
              type: FFMessageType.MOUNT,
              data: { fsType, options, mountPoint },
          }, trans);
      };
      unmount = (mountPoint) => {
          const trans = [];
          return this.#send({
              type: FFMessageType.UNMOUNT,
              data: { mountPoint },
          }, trans);
      };
      /**
       * Read data from ffmpeg.wasm.
       *
       * @example
       * ```ts
       * const ffmpeg = new FFmpeg();
       * await ffmpeg.load();
       * const data = await ffmpeg.readFile("video.mp4");
       * ```
       *
       * @category File System
       */
      readFile = (path, 
      /**
       * File content encoding, supports two encodings:
       * - utf8: read file as text file, return data in string type.
       * - binary: read file as binary file, return data in Uint8Array type.
       *
       * @defaultValue binary
       */
      encoding = "binary", { signal } = {}) => this.#send({
          type: FFMessageType.READ_FILE,
          data: { path, encoding },
      }, undefined, signal);
      /**
       * Delete a file.
       *
       * @category File System
       */
      deleteFile = (path, { signal } = {}) => this.#send({
          type: FFMessageType.DELETE_FILE,
          data: { path },
      }, undefined, signal);
      /**
       * Rename a file or directory.
       *
       * @category File System
       */
      rename = (oldPath, newPath, { signal } = {}) => this.#send({
          type: FFMessageType.RENAME,
          data: { oldPath, newPath },
      }, undefined, signal);
      /**
       * Create a directory.
       *
       * @category File System
       */
      createDir = (path, { signal } = {}) => this.#send({
          type: FFMessageType.CREATE_DIR,
          data: { path },
      }, undefined, signal);
      /**
       * List directory contents.
       *
       * @category File System
       */
      listDir = (path, { signal } = {}) => this.#send({
          type: FFMessageType.LIST_DIR,
          data: { path },
      }, undefined, signal);
      /**
       * Delete an empty directory.
       *
       * @category File System
       */
      deleteDir = (path, { signal } = {}) => this.#send({
          type: FFMessageType.DELETE_DIR,
          data: { path },
      }, undefined, signal);
  }

  var FFFSType;
  (function (FFFSType) {
      FFFSType["MEMFS"] = "MEMFS";
      FFFSType["NODEFS"] = "NODEFS";
      FFFSType["NODERAWFS"] = "NODERAWFS";
      FFFSType["IDBFS"] = "IDBFS";
      FFFSType["WORKERFS"] = "WORKERFS";
      FFFSType["PROXYFS"] = "PROXYFS";
  })(FFFSType || (FFFSType = {}));

  const ERROR_RESPONSE_BODY_READER = new Error("failed to get response body reader");
  const ERROR_INCOMPLETED_DOWNLOAD = new Error("failed to complete download");

  const HeaderContentLength = "Content-Length";

  /**
   * Download content of a URL with progress.
   *
   * Progress only works when Content-Length is provided by the server.
   *
   */
  const downloadWithProgress = async (url, cb) => {
      const resp = await fetch(url);
      let buf;
      try {
          // Set total to -1 to indicate that there is not Content-Type Header.
          const total = parseInt(resp.headers.get(HeaderContentLength) || "-1");
          const reader = resp.body?.getReader();
          if (!reader)
              throw ERROR_RESPONSE_BODY_READER;
          const chunks = [];
          let received = 0;
          for (;;) {
              const { done, value } = await reader.read();
              const delta = value ? value.length : 0;
              if (done) {
                  if (total != -1 && total !== received)
                      throw ERROR_INCOMPLETED_DOWNLOAD;
                  cb && cb({ url, total, received, delta, done });
                  break;
              }
              chunks.push(value);
              received += delta;
              cb && cb({ url, total, received, delta, done });
          }
          const data = new Uint8Array(received);
          let position = 0;
          for (const chunk of chunks) {
              data.set(chunk, position);
              position += chunk.length;
          }
          buf = data.buffer;
      }
      catch (e) {
          console.log(`failed to send download progress event: `, e);
          // Fetch arrayBuffer directly when it is not possible to get progress.
          buf = await resp.arrayBuffer();
      }
      return buf;
  };
  /**
   * toBlobURL fetches data from an URL and return a blob URL.
   *
   * Example:
   *
   * ```ts
   * await toBlobURL("http://localhost:3000/ffmpeg.js", "text/javascript");
   * ```
   */
  const toBlobURL = async (url, mimeType, progress = false, cb) => {
      const buf = progress
          ? await downloadWithProgress(url, cb)
          : await (await fetch(url)).arrayBuffer();
      const blob = new Blob([buf], { type: mimeType });
      return URL.createObjectURL(blob);
  };

  class FFmpegConvertor {
    coreURL;
    wasmURL;
    ffmpeg;
    size = 0;
    /// 140MB, don't know why, but it's the limit, if execced, ffmpeg throw index out of bounds error
    maxSize = 14e7;
    taskCount = 0;
    reloadLock = false;
    async init() {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
      this.coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
      this.wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");
      this.ffmpeg = new FFmpeg();
      await this.load();
      return this;
    }
    async load() {
      await this.ffmpeg.load(
        {
          coreURL: this.coreURL,
          wasmURL: this.wasmURL
          // classWorkerURL: this.classWorkerURL,
        }
      );
    }
    async check() {
      if (!this.coreURL || !this.wasmURL || !this.ffmpeg) {
        throw new Error("FFmpegConvertor not init");
      }
      if (this.size > this.maxSize) {
        const verLock = this.reloadLock;
        await this.waitForTaskZero();
        if (!this.reloadLock) {
          this.reloadLock = true;
          try {
            evLog("info", "FFmpegConvertor: size limit exceeded, terminate ffmpeg, verLock: ", verLock);
            this.ffmpeg.terminate();
            await this.load();
            this.size = 0;
            this.taskCount = 0;
          } finally {
            this.reloadLock = false;
          }
        } else {
          await this.waitForReloadLock();
        }
      }
    }
    async writeFiles(files, randomPrefix) {
      const ffmpeg = this.ffmpeg;
      await Promise.all(
        files.map(async (f) => {
          this.size += f.data.byteLength;
          await ffmpeg.writeFile(randomPrefix + f.name, f.data);
        })
      );
    }
    async readOutputFile(file) {
      const result = await this.ffmpeg.readFile(file);
      this.size += result.length;
      return result;
    }
    // TODO: find a way to reduce time cost; to mp4 30MB takes 50s; to gif 30MB takes 26s
    async convertTo(files, format, meta) {
      await this.check();
      this.taskCount++;
      try {
        const ffmpeg = this.ffmpeg;
        const randomPrefix = Math.random().toString(36).substring(7);
        await this.writeFiles(files, randomPrefix);
        let metaStr;
        if (meta) {
          metaStr = meta.map((m) => `file '${randomPrefix}${m.file}'
duration ${m.delay / 1e3}`).join("\n");
        } else {
          metaStr = files.map((f) => `file '${randomPrefix}${f.name}'
duration 0.04`).join("\n");
        }
        await ffmpeg.writeFile(randomPrefix + "meta.txt", metaStr);
        let resultFile;
        let mimeType;
        switch (format) {
          case "GIF":
            resultFile = randomPrefix + "output.gif";
            mimeType = "image/gif";
            await ffmpeg.exec(["-f", "concat", "-safe", "0", "-i", randomPrefix + "meta.txt", "-vf", "split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=2", resultFile]);
            break;
          case "MP4":
            resultFile = randomPrefix + "output.mp4";
            mimeType = "video/mp4";
            await ffmpeg.exec(["-f", "concat", "-safe", "0", "-i", randomPrefix + "meta.txt", "-c:v", "h264", "-pix_fmt", "yuv420p", resultFile]);
            break;
        }
        const result = await this.readOutputFile(resultFile);
        const deletePromise = files.map((f) => ffmpeg.deleteFile(randomPrefix + f.name));
        if (meta) {
          deletePromise.push(ffmpeg.deleteFile(randomPrefix + "meta.txt"));
        }
        deletePromise.push(ffmpeg.deleteFile(resultFile));
        await Promise.all(deletePromise);
        return new Blob([result], { type: mimeType });
      } finally {
        this.taskCount--;
      }
    }
    async waitForTaskZero() {
      while (this.taskCount > 0) {
        await new Promise((r) => setTimeout(r, 100));
      }
      await new Promise((r) => setTimeout(r, Math.random() * 100 + 10));
    }
    async waitForReloadLock() {
      while (this.reloadLock) {
        await new Promise((r) => setTimeout(r, 100));
      }
      await new Promise((r) => setTimeout(r, Math.random() * 100 + 10));
    }
  }

  class PixivHomeAPI {
    homeData;
    thumbnails = {};
    pids = {};
    async fetchChapters() {
      const { error, body } = await window.fetch("https://www.pixiv.net/ajax/top/illust?mode=all&lang=en").then((res) => res.json());
      if (error) throw new Error("fetch your home data error, check you have already logged in");
      this.homeData = body;
      this.thumbnails = body.thumbnails.illust.reduce((prev, curr) => {
        prev[curr.id] = curr;
        return prev;
      }, {});
      const chapters = [];
      const byTag = body.page.recommendByTag.reduce((prev, curr) => {
        prev[curr.tag] = curr.ids;
        return prev;
      }, {});
      this.pids = { "follow": body.page.follow.map((id2) => id2.toString()), "for you": body.page.recommend.ids, ...byTag };
      let id = 0;
      for (const [t, pids] of Object.entries(this.pids)) {
        chapters.push(new Chapter(
          id,
          t === "follow" ? "Your Following" : "Recommend " + t,
          t,
          this.thumbnails[pids[0] ?? ""]?.url
        ));
        id++;
      }
      return chapters;
    }
    async *next(chapter) {
      const pidList = this.pids[chapter.source];
      if (pidList.length === 0) {
        yield Result.ok([]);
        return;
      }
      while (pidList.length > 0) {
        const pids = pidList.splice(0, 20);
        const grouped = pids.reduce((prev, curr) => {
          const userId = this.thumbnails[curr]?.userId ?? "unk";
          if (!prev[userId]) prev[userId] = [];
          prev[userId].push(curr);
          return prev;
        }, {});
        const ret = Object.entries(grouped).map(([userID, pids2]) => ({ id: userID === "unk" ? void 0 : userID, pids: pids2 }));
        yield Result.ok(ret);
      }
    }
    title() {
      return "home";
    }
  }
  class PixivArtistWorksAPI {
    first;
    author;
    title() {
      return this.author ?? "author";
    }
    async fetchChapters() {
      return [new Chapter(1, "Default", window.location.href)];
    }
    async *next(_ch) {
      this.author = findAuthorID();
      if (!this.author) throw new Error("Cannot find author id!");
      this.first = window.location.href.match(/artworks\/(\d+)$/)?.[1];
      if (this.first) {
        yield Result.ok([{ id: this.author, pids: [this.first] }]);
        while (conf.pixivJustCurrPage) {
          yield Result.ok([]);
        }
      }
      const res = await window.fetch(`https://www.pixiv.net/ajax/user/${this.author}/profile/all`).then((resp) => resp.json());
      if (res.error) throw new Error(`Fetch illust list error: ${res.message}`);
      let pidList = [...Object.keys(res.body.illusts), ...Object.keys(res.body.manga)];
      if (conf.pixivAscendWorks) {
        pidList = pidList.sort((a, b) => parseInt(a) - parseInt(b));
      } else {
        pidList = pidList.sort((a, b) => parseInt(b) - parseInt(a));
      }
      if (this.first) {
        const index = pidList.indexOf(this.first);
        if (index > -1) pidList.splice(index, 1);
      }
      while (pidList.length > 0) {
        const pids = pidList.splice(0, 20);
        yield Result.ok([{ id: this.author, pids }]);
      }
    }
  }
  const PID_EXTRACT = /\/(\d+)_([a-z]+)\d*\.\w*$/;
  class PixivMatcher extends BaseMatcher {
    name() {
      return "Pixiv";
    }
    api;
    meta;
    pageCount = 0;
    works = {};
    ugoiraMetas = {};
    convertor;
    csrfToken;
    constructor() {
      super();
      this.meta = new GalleryMeta(window.location.href, "UNTITLE");
      if (/pixiv.net(\/en\/)?$/.test(window.location.href)) {
        this.api = new PixivHomeAPI();
      } else {
        this.api = new PixivArtistWorksAPI();
      }
    }
    async processData(data, contentType, node) {
      const meta = this.ugoiraMetas[node.originSrc];
      if (!meta) return [data, contentType];
      const zipReader = new zip_js__namespace.ZipReader(new zip_js__namespace.Uint8ArrayReader(data));
      const start = performance.now();
      if (!this.convertor) this.convertor = await new FFmpegConvertor().init();
      const initConvertorEnd = performance.now();
      const promises = await zipReader.getEntries().then(
        (entries) => entries.map(
          (e) => e.getData?.(new zip_js__namespace.Uint8ArrayWriter()).then((data2) => ({ name: e.filename, data: data2 }))
        )
      );
      const files = await Promise.all(promises).then((entries) => entries.filter((f) => f && f.data.length > 0).map((f) => f));
      const unpackUgoira = performance.now();
      if (files.length !== meta.body.frames.length) {
        throw new Error("unpack ugoira file error: file count not equal to meta");
      }
      const blob = await this.convertor.convertTo(files, conf.pixivConvertTo, meta.body.frames);
      const convertEnd = performance.now();
      evLog("debug", `convert ugoira to ${conf.pixivConvertTo}
init convertor cost: ${initConvertorEnd - start}ms
unpack ugoira  cost: ${unpackUgoira - initConvertorEnd}ms
ffmpeg convert cost: ${convertEnd - unpackUgoira}ms
total cost: ${(convertEnd - start) / 1e3}s
size: ${blob.size / 1e3} KB, original size: ${data.byteLength / 1e3} KB
before contentType: ${contentType}, after contentType: ${blob.type}
`);
      return blob.arrayBuffer().then((buffer) => [new Uint8Array(buffer), blob.type]);
    }
    workURL() {
      return /pixiv.net\/(en\/)?(artworks\/.*|users\/.*|$)/;
    }
    galleryMeta() {
      this.meta.title = `pixiv_${this.api.title()}_w${Object.keys(this.works).length}_p${this.pageCount}` || "UNTITLE";
      this.meta.tags = Object.entries(this.works).reduce((tags, work) => {
        tags[work[0]] = work[1].tags;
        return tags;
      }, {});
      return this.meta;
    }
    async fetchTagsByPids(authorID, pids) {
      try {
        const raw = await window.fetch(`https://www.pixiv.net/ajax/user/${authorID}/profile/illusts?ids[]=${pids.join("&ids[]=")}&work_category=illustManga&is_first_page=0&lang=en`).then((resp) => resp.json());
        const data = raw;
        if (!data.error) {
          const works = {};
          Object.entries(data.body.works).forEach(([k, w]) => {
            works[k] = {
              id: w.id,
              title: w.title,
              alt: w.alt,
              illustType: w.illustType,
              description: w.description,
              tags: w.tags,
              pageCount: w.pageCount
            };
          });
          this.works = { ...this.works, ...works };
        } else {
          evLog("error", "WARN: fetch tags by pids error: ", data.message);
        }
      } catch (error) {
        evLog("error", "ERROR: fetch tags by pids error: ", error);
      }
    }
    fetchChapters() {
      this.csrfToken = document.querySelector("#__NEXT_DATA__")?.textContent?.match(/\\"api\\":\{\\"token\\":\\"(\w+)\\"/)?.[1];
      return this.api.fetchChapters();
    }
    fetchPagesSource(chapter) {
      return this.api.next(chapter);
    }
    async parseImgNodes(aps) {
      const list = [];
      if (aps.length === 0) return list;
      const pids = [];
      for (const ap of aps) {
        if (ap.id) {
          this.fetchTagsByPids(ap.id, ap.pids);
        }
        pids.push(...ap.pids);
      }
      if (pids.length === 0) return list;
      if (conf.pixivAscendWorks) {
        pids.sort((a, b) => parseInt(a) - parseInt(b));
      } else {
        pids.sort((a, b) => parseInt(b) - parseInt(a));
      }
      const pageListData = await batchFetch(pids.map((p) => `https://www.pixiv.net/ajax/illust/${p}/pages?lang=en`), 5, "json");
      for (let i = 0; i < pids.length; i++) {
        const pid = pids[i];
        const data = pageListData[i];
        if (data instanceof Error || data.error) {
          const reason = `pid:[${pid}], ${data.message}`;
          evLog("error", reason);
          EBUS.emit("notify-message", "error", reason, 8e3);
          continue;
        }
        const actionLike = new NodeAction("☺", "like this illust", async () => {
          if (this.csrfToken) {
            await fetch("https://www.pixiv.net/ajax/illusts/like", {
              "headers": {
                "content-type": "application/json; charset=utf-8",
                "x-csrf-token": this.csrfToken
              },
              "body": '{"illust_id":"' + pid + '"}',
              "method": "POST",
              "mode": "cors"
            });
          } else {
            EBUS.emit("notify-message", "error", "cannot find csrf_token from this page");
          }
        });
        const actionBookmark = new NodeAction("♥", "bookmark this illust", async () => {
          if (this.csrfToken) {
            await fetch("https://www.pixiv.net/ajax/illusts/bookmarks/add", {
              "credentials": "include",
              "headers": {
                "content-type": "application/json; charset=utf-8",
                "x-csrf-token": this.csrfToken
              },
              "body": '{"illust_id":"' + pid + '","restrict":0,"comment":"","tags":[]}',
              "method": "POST",
              "mode": "cors"
            });
          } else {
            EBUS.emit("notify-message", "error", "cannot find csrf_token from this page");
          }
        });
        this.pageCount += data.body.length;
        const digits = data.body.length.toString().length;
        let j = -1;
        for (const p of data.body) {
          let title = p.urls.original.split("/").pop() || `${pid}_p${j.toString().padStart(digits)}.jpg`;
          const matches = p.urls.original.match(PID_EXTRACT);
          if (matches && matches.length > 2 && matches[2] && matches[2] === "ugoira") {
            title = title.replace(/\.\w+$/, ".gif");
          }
          j++;
          const node = new ImageNode(p.urls.small, `${window.location.origin}/artworks/${pid}`, title, void 0, p.urls.original, { w: p.width, h: p.height });
          node.actions.push(actionLike);
          node.actions.push(actionBookmark);
          list.push(node);
        }
      }
      return list;
    }
    async fetchOriginMeta(node) {
      const matches = node.originSrc.match(PID_EXTRACT);
      if (!matches || matches.length < 2) {
        return { url: node.originSrc };
      }
      const pid = matches[1];
      const p = matches[2];
      if (this.works[pid]?.illustType === 2 || p === "ugoira") {
        const meta = await window.fetch(`https://www.pixiv.net/ajax/illust/${pid}/ugoira_meta?lang=en`).then((resp) => resp.json());
        this.ugoiraMetas[meta.body.src] = meta;
        return { url: meta.body.src };
      } else {
        return { url: node.originSrc };
      }
    }
  }
  function findAuthorID() {
    const u = document.querySelector("a[data-gtm-value][href*='/users/']")?.href || document.querySelector("a.user-details-icon[href*='/users/']")?.href || window.location.href;
    const author = /users\/(\d+)/.exec(u)?.[1];
    return author;
  }

  class RokuHentaiMatcher extends BaseMatcher {
    name() {
      return "rokuhentai";
    }
    sprites = [];
    fetchedThumbnail = [];
    galleryId = "";
    imgCount = 0;
    workURL() {
      return /rokuhentai.com\/\w+$/;
    }
    galleryMeta() {
      const title = document.querySelector(".site-manga-info__title-text")?.textContent || "UNTITLE";
      const meta = new GalleryMeta(window.location.href, title);
      meta.originTitle = title;
      const tagTrList = document.querySelectorAll("div.mdc-chip .site-tag-count");
      const tags = {};
      tagTrList.forEach((tr) => {
        const splits = tr.getAttribute("data-tag")?.trim().split(":");
        if (splits === void 0 || splits.length === 0) return;
        const cat = splits[0];
        if (tags[cat] === void 0) tags[cat] = [];
        tags[cat].push(splits[1].replaceAll('"', ""));
      });
      meta.tags = tags;
      return meta;
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    async parseImgNodes(range) {
      const list = [];
      const digits = this.imgCount.toString().length;
      for (let i = range[0]; i < range[1]; i++) {
        let thumbnail = "";
        let thumbnailAsync = void 0;
        if (this.sprites[i]) {
          thumbnailAsync = this.fetchThumbnail(i);
        } else {
          thumbnail = `https://rokuhentai.com/_images/page-thumbnails/${this.galleryId}/${i}.jpg`;
        }
        const src = `https://rokuhentai.com/_images/pages/${this.galleryId}/${i}.jpg`;
        list.push(new ImageNode(thumbnail, src, i.toString().padStart(digits, "0") + ".jpg", thumbnailAsync, src));
      }
      return list;
    }
    async *fetchPagesSource() {
      const doc = document;
      const imgCount = parseInt(doc.querySelector(".mdc-typography--caption")?.textContent || "");
      if (isNaN(imgCount)) {
        throw new Error("error: failed query image count!");
      }
      this.imgCount = imgCount;
      this.galleryId = window.location.href.split("/").pop();
      const images = Array.from(doc.querySelectorAll(".mdc-layout-grid__cell .site-page-card__media"));
      for (const img of images) {
        this.fetchedThumbnail.push(void 0);
        const x = parseInt(img.getAttribute("data-offset-x") || "");
        const y = parseInt(img.getAttribute("data-offset-y") || "");
        const width = parseInt(img.getAttribute("data-width") || "");
        const height = parseInt(img.getAttribute("data-height") || "");
        if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
          this.sprites.push(void 0);
          continue;
        }
        const src = img.getAttribute("data-src");
        this.sprites.push({ src, pos: { x, y, width, height } });
      }
      for (let i = 0; i < this.imgCount; i += 20) {
        yield Result.ok([i, Math.min(i + 20, this.imgCount)]);
      }
    }
    async fetchThumbnail(index) {
      if (this.fetchedThumbnail[index]) {
        return this.fetchedThumbnail[index];
      }
      const src = this.sprites[index].src;
      const positions = [];
      for (let i = index; i < this.imgCount; i++) {
        if (src === this.sprites[i]?.src) {
          positions.push(this.sprites[i].pos);
        } else {
          break;
        }
      }
      const urls = await splitImagesFromUrl(src, positions);
      for (let i = index; i < index + urls.length; i++) {
        this.fetchedThumbnail[i] = urls[i - index];
      }
      return this.fetchedThumbnail[index];
    }
    async processData(data) {
      return [data, "image/jpeg"];
    }
  }

  const STEAM_THUMB_IMG_URL_REGEX = /background-image:\surl\(.*?(h.*\/).*?\)/;
  class SteamMatcher extends BaseMatcher {
    name() {
      return "Steam Screenshots";
    }
    workURL() {
      return /steamcommunity.com\/id\/[^/]+\/screenshots.*/;
    }
    async fetchOriginMeta(node) {
      let raw = "";
      try {
        raw = await window.fetch(node.href).then((resp) => resp.text());
        if (!raw) throw new Error("[text] is empty");
      } catch (error) {
        throw new Error(`Fetch source page error, expected [text]！ ${error}`);
      }
      const domParser = new DOMParser();
      const doc = domParser.parseFromString(raw, "text/html");
      const imgURL = doc.querySelector(".actualmediactn > a")?.getAttribute("href");
      if (!imgURL) {
        throw new Error("Cannot Query Steam original Image URL");
      }
      return { url: imgURL };
    }
    async parseImgNodes(source) {
      const list = [];
      const doc = await window.fetch(source).then((resp) => resp.text()).then((raw) => new DOMParser().parseFromString(raw, "text/html"));
      if (!doc) {
        throw new Error("warn: steam matcher failed to get document from source page!");
      }
      const nodes = doc.querySelectorAll(".profile_media_item");
      if (!nodes || nodes.length == 0) {
        throw new Error("warn: failed query image nodes!");
      }
      for (const node of Array.from(nodes)) {
        const src = STEAM_THUMB_IMG_URL_REGEX.exec(node.innerHTML)?.[1];
        if (!src) {
          throw new Error(`Cannot Match Steam Image URL, Content: ${node.innerHTML}`);
        }
        const newNode = new ImageNode(
          src,
          node.getAttribute("href"),
          node.getAttribute("data-publishedfileid") + ".jpg"
        );
        list.push(newNode);
      }
      return list;
    }
    async *fetchPagesSource() {
      let totalPages = -1;
      document.querySelectorAll(".pagingPageLink").forEach((ele) => {
        totalPages = Number(ele.textContent);
      });
      const url = new URL(window.location.href);
      url.searchParams.set("view", "grid");
      if (totalPages === -1) {
        const doc = await window.fetch(url.href).then((response) => response.text()).then((text) => new DOMParser().parseFromString(text, "text/html")).catch(() => null);
        if (!doc) {
          throw new Error("warn: steam matcher failed to get document from source page!");
        }
        doc.querySelectorAll(".pagingPageLink").forEach((ele) => totalPages = Number(ele.textContent));
      }
      if (totalPages > 0) {
        for (let p = 1; p <= totalPages; p++) {
          url.searchParams.set("p", p.toString());
          yield Result.ok(url.href);
        }
      } else {
        yield Result.ok(url.href);
      }
    }
    parseGalleryMeta() {
      const url = new URL(window.location.href);
      const appid = url.searchParams.get("appid");
      return new GalleryMeta(window.location.href, "steam-" + appid || "all");
    }
  }

  class TwitterUserMediasAPI {
    uuid = uuid();
    userID;
    fetchChapters() {
      if (window.location.href.includes("/media")) {
        return [new Chapter(1, "User Medias", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg")];
      } else {
        return [
          new Chapter(0, "User Posts", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"),
          new Chapter(1, "User Media", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg")
        ];
      }
    }
    async next(chapter, cursor) {
      if (!this.userID) this.userID = getUserID();
      if (!this.userID) throw new Error("Cannot obatained User ID");
      let url = "";
      if (chapter.id === 0) {
        const variables = `{"userId":"${this.userID}","count":20,${cursor ? '"cursor":"' + cursor + '",' : ""}"includePromotedContent":true,"withQuickPromoteEligibilityTweetFields":true,"withVoice":true}`;
        const features = "&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Afalse%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D";
        url = `${window.location.origin}/i/api/graphql/q6xj5bs0hapm9309hexA_g/UserTweets?variables=${encodeURIComponent(variables)}${features}`;
      } else {
        const variables = `{"userId":"${this.userID}","count":20,${cursor ? '"cursor":"' + cursor + '",' : ""}"includePromotedContent":false,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true}`;
        const features = "&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_media_interstitial_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D";
        url = `${window.location.origin}/i/api/graphql/aQQLnkexAl5z9ec_UgbEIA/UserMedia?variables=${encodeURIComponent(variables)}${features}`;
      }
      try {
        const res = await window.fetch(url, { headers: createHeader(this.uuid), signal: AbortSignal.timeout(1e4) });
        const json = await res.json();
        if (res.status !== 200 && json?.errors?.[0].message) {
          throw new Error(json?.errors?.[0].message);
        }
        if (chapter.id === 0) {
          const instructions = json.data.user.result.timeline.timeline.instructions;
          const entries = instructions.find((ins) => ins.type === "TimelineAddEntries");
          if (!entries) throw new Error("Not found TimelineAddEntries");
          const { items, cursor: cursor2 } = homeForYouEntriesToItems(entries);
          return [items, cursor2];
        } else {
          const instructions = json.data.user.result.timeline_v2.timeline.instructions;
          const items = [];
          const addToModule = instructions.find((ins) => ins.type === "TimelineAddToModule");
          const entries = instructions.find((ins) => ins.type === "TimelineAddEntries");
          if (!entries) {
            throw new Error("Not found TimelineAddEntries");
          }
          if (addToModule) {
            addToModule.moduleItems.forEach((i) => items.push(i.item));
          }
          if (items.length === 0) {
            const timelineModule = entries.entries.find((entry) => entry.content.entryType === "TimelineTimelineModule")?.content;
            timelineModule?.items.forEach((i) => items.push(i.item));
          }
          const cursor2 = entries.entries.find((entry) => entry.content.entryType === "TimelineTimelineCursor" && entry.entryId.startsWith("cursor-bottom"))?.content?.value;
          return [items, cursor2];
        }
      } catch (error) {
        throw new Error(`twitter api query error: ${error}`);
      }
    }
  }
  class TwitterListsAPI {
    uuid = uuid();
    listID;
    fetchChapters() {
      return [new Chapter(1, "User Medias", window.location.href)];
    }
    getListID() {
      return window.location.href.match(/i\/lists\/(\d+)$/)?.[1];
    }
    async next(_chapter, cursor) {
      if (!this.listID) this.listID = this.getListID();
      if (!this.listID) throw new Error("Cannot obatained list ID");
      const variables = `{"listId":"${this.listID}","count":20${cursor ? ',"cursor":"' + cursor + '"' : ""}}`;
      const features = "&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Afalse%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D";
      const url = `${window.location.origin}/i/api/graphql/LSefrrxhpeX8HITbKfWz9g/ListLatestTweetsTimeline?variables=${encodeURIComponent(variables)}${features}`;
      try {
        const res = await window.fetch(url, { headers: createHeader(this.uuid), signal: AbortSignal.timeout(1e4) });
        const json = await res.json();
        if (res.status !== 200 && json?.errors?.[0].message) {
          throw new Error(json?.errors?.[0].message);
        }
        const instructions = json.data.list.tweets_timeline.timeline.instructions;
        const entries = instructions.find((ins) => ins.type === "TimelineAddEntries");
        if (!entries) {
          throw new Error("Not found TimelineAddEntries");
        }
        const { items, cursor: cursor2 } = homeForYouEntriesToItems(entries);
        return [items, cursor2];
      } catch (error) {
        throw new Error(`twitter api query error: ${error}`);
      }
    }
  }
  class TwitterHomeForYouAPI {
    uuid = uuid();
    seenTweetIds = { 1: [], 2: [], 3: [] };
    chapterCursors = { 1: void 0, 2: void 0, 3: void 0 };
    myID;
    fetchChapters() {
      return [
        new Chapter(1, "For you", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"),
        new Chapter(2, "Following", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"),
        new Chapter(3, "Your Likes", window.location.href, "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg")
      ];
    }
    async next(chapter) {
      const cursor = this.chapterCursors[chapter.id];
      const seenTweetIds = this.seenTweetIds[chapter.id].map((e) => '"' + e + '"').join(",");
      const headers = createHeader(this.uuid);
      const [url, body] = (() => {
        if (chapter.id === 1) {
          const url2 = `${window.location.origin}/i/api/graphql/ci_OQZ2k0rG0Ax_lXRiWVA/HomeTimeline`;
          const cursorStr = cursor ? `"cursor":"${cursor}",` : "";
          const body2 = `{"variables":{"count":20,${cursorStr}"includePromotedContent":true,"latestControlAvailable":true,"requestContext":"launch","withCommunity":true,"seenTweetIds":[${seenTweetIds}]},"features":{"rweb_video_screen_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":false,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false},"queryId":"ci_OQZ2k0rG0Ax_lXRiWVA"}`;
          return [url2, body2];
        } else if (chapter.id === 2) {
          const url2 = `${window.location.origin}/i/api/graphql/nMyTQqsJiUGBKLGNSQamAA/HomeLatestTimeline`;
          const cursorStr = cursor ? `"cursor":"${cursor}",` : "";
          const body2 = `{"variables":{"count":20,${cursorStr}"includePromotedContent":true,"latestControlAvailable":true,"seenTweetIds":[${seenTweetIds}]},"features":{"rweb_video_screen_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":false,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false},"queryId":"nMyTQqsJiUGBKLGNSQamAA"}`;
          return [url2, body2];
        } else {
          if (!this.myID) this.myID = getMyID();
          if (!this.myID) throw new Error("cannot find my id from current page");
          const cursorStr = cursor ? `"cursor":"${cursor}",` : "";
          const variables = `{"userId":"${this.myID}","count":20,${cursorStr}"includePromotedContent":false,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true}`;
          const features = "&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Afalse%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D";
          const url2 = `${window.location.origin}/i/api/graphql/uxjTlmrTI61zreSIV1urbw/Likes?variables=${encodeURIComponent(variables)}${features}`;
          return [url2, ""];
        }
      })();
      try {
        const h = {};
        headers.forEach((v, k) => {
          h[k] = v;
        });
        const text = await new Promise((resolve, reject) => {
          _GM_xmlhttpRequest({
            method: body ? "POST" : "GET",
            url,
            headers: h,
            data: body ? body : void 0,
            timeout: 2e4,
            onload: (event) => resolve(event.response),
            ontimeout: () => reject("timeout"),
            onerror: (reason) => reject(reason)
          });
        });
        const json = JSON.parse(text);
        if (json?.errors?.[0].message) {
          throw new Error(json?.errors?.[0].message);
        }
        const instructions = (() => {
          if (chapter.id === 3) {
            if (json?.data?.user?.result?.timeline_v2?.timeline?.instructions) {
              return json.data.user.result.timeline_v2.timeline.instructions;
            } else if (json?.data?.user?.result?.timeline?.timeline?.instructions) {
              return json.data.user.result.timeline.timeline.instructions;
            } else {
              throw new Error("cannot found: json?.data?.user?.result?.timeline_v2?.timeline?.instructions");
            }
          } else {
            if (!json?.data?.home?.home_timeline_urt?.instructions) {
              throw new Error("cannot found: json?.data?.home?.home_timeline_urt?.instructions");
            }
            const instructions2 = json.data.home.home_timeline_urt.instructions;
            return instructions2;
          }
        })();
        const entries = instructions.find((ins) => ins.type === "TimelineAddEntries");
        if (!entries) throw new Error("Not found TimelineAddEntries");
        const { items, ids, cursor: cursor2 } = homeForYouEntriesToItems(entries);
        this.seenTweetIds[chapter.id] = ids;
        this.chapterCursors[chapter.id] = cursor2;
        return [items, cursor2];
      } catch (error) {
        throw new Error(`twitter api query error: ${error}`);
      }
    }
  }
  class TwitterMatcher extends BaseMatcher {
    name() {
      return "Twitter | X";
    }
    postCount = 0;
    mediaCount = 0;
    api;
    uuid = uuid();
    constructor() {
      super();
      if (/\/home$/.test(window.location.href)) {
        this.api = new TwitterHomeForYouAPI();
      } else if (/i\/lists\/\d+$/.test(window.location.href)) {
        this.api = new TwitterListsAPI();
      } else {
        this.api = new TwitterUserMediasAPI();
      }
    }
    async fetchChapters() {
      return this.api.fetchChapters();
    }
    async *fetchPagesSource(chapter) {
      let cursor;
      while (true) {
        try {
          const [mediaPage, nextCursor] = await this.api.next(chapter, cursor);
          cursor = nextCursor || "last";
          if (!mediaPage || mediaPage.length === 0) break;
          yield Result.ok(mediaPage);
          if (!nextCursor) break;
        } catch (error) {
          yield Result.err(error);
        }
      }
    }
    async parseImgNodes(items) {
      if (!items) throw new Error("warn: cannot find items");
      const list = [];
      for (const item of items) {
        const legacy = item?.itemContent?.tweet_results?.result?.legacy || item?.itemContent?.tweet_results?.result?.tweet?.legacy || item?.itemContent?.tweet_results?.result?.legacy?.retweeted_status_result?.result?.legacy;
        const mediaList = legacy?.entities.media;
        if (mediaList === void 0) {
          const user = item.itemContent?.tweet_results?.result?.core?.user_results?.result?.legacy?.name;
          const rest_id = item.itemContent.tweet_results.result.rest_id;
          evLog("error", `cannot found mediaList: ${window.location.origin}/${user}/status/${rest_id}`, item);
          continue;
        }
        const tweetID = legacy?.id_str;
        const actionLike = new NodeAction("♥", "like this tweet", async () => {
          await fetch("https://x.com/i/api/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet", {
            "headers": createHeader(this.uuid),
            "body": '{"variables":{"tweet_id":"' + tweetID + '"},"queryId":"lI07N6Otwv1PhnEgXILM7A"}',
            "method": "POST",
            "mode": "cors"
          });
        });
        const actionBookmark = new NodeAction("🔖", "bookmark this tweet", async () => {
          await fetch("https://x.com/i/api/graphql/aoDbu3RHznuiSkQ9aNM67Q/CreateBookmark", {
            "headers": createHeader(this.uuid),
            "body": '{"variables":{"tweet_id":"' + tweetID + '"},"queryId":"aoDbu3RHznuiSkQ9aNM67Q"}',
            "method": "POST",
            "mode": "cors"
          });
        });
        this.postCount++;
        if (conf.reverseMultipleImagesPost) {
          mediaList.reverse();
        }
        for (let i = 0; i < mediaList.length; i++) {
          const media = mediaList[i];
          if (conf.excludeVideo && media.type === "video") {
            continue;
          }
          if (media.type !== "video" && media.type !== "photo" && media.type !== "animated_gif") {
            evLog("error", `Not supported media type: ${media.type}`);
            continue;
          }
          const ext = media.media_url_https.split(".").pop();
          const baseSrc = media.media_url_https.replace(`.${ext}`, "");
          const src = `${baseSrc}?format=${ext}&name=${media.sizes.small ? "small" : "thumb"}`;
          let href = media.expanded_url.replace(/\/(photo|video)\/\d+/, "");
          href = `${href}/${media.type === "video" ? "video" : "photo"}/${i + 1}`;
          const largeSrc = `${baseSrc}?format=${ext}&name=${media.sizes.large ? "large" : media.sizes.medium ? "medium" : "small"}`;
          const title = `${media.id_str}-${baseSrc.split("/").pop()}.${ext}`;
          const wh = { w: media.sizes.small.w, h: media.sizes.small.h };
          const node = new ImageNode(src, href, title, void 0, largeSrc, wh);
          node.actions.push(actionLike);
          node.actions.push(actionBookmark);
          if (media.video_info) {
            let bitrate = 0;
            for (const variant of media.video_info.variants) {
              if (variant.bitrate !== void 0 && variant.bitrate >= bitrate) {
                bitrate = variant.bitrate;
                node.originSrc = variant.url;
                node.mimeType = variant.content_type;
                node.title = node.title.replace(/\.\w+$/, `.${variant.content_type.split("/")[1]}`);
              }
            }
          }
          list.push(node);
          this.mediaCount++;
        }
      }
      return list;
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    workURL() {
      return /(\/x|twitter).com\/(?!(explore|notifications|messages|jobs|lists)$|i\/(?!list)|search\?)\w+/;
    }
    galleryMeta() {
      const userName = window.location.href.match(/(twitter|x).com\/(\w+)\/?/)?.[2];
      return new GalleryMeta(window.location.href, `twitter-${userName || document.title}-${this.postCount}-${this.mediaCount}`);
    }
  }
  function getMyID() {
    return Array.from(document.querySelectorAll("script")).find((sc) => sc.innerText.startsWith("window.__INITIAL_STATE__"))?.innerText.match(/"id_str":\s?"(\d+)"/)?.[1];
  }
  function getUserID() {
    const userName = window.location.href.match(/(twitter|x).com\/(\w+)\/?/)?.[2] || "lililjiliijili";
    const followBTNs = Array.from(document.querySelectorAll("button[data-testid][aria-label]"));
    if (followBTNs.length === 0) return void 0;
    const theBTN = followBTNs.find((btn) => (btn.getAttribute("aria-label") ?? "").toLowerCase().includes(`@${userName.toLowerCase()}`)) || followBTNs[0];
    return theBTN.getAttribute("data-testid").match(/(\d+)/)?.[1];
  }
  function createHeader(uuid2) {
    const headers = new Headers();
    headers.set("authorization", "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA");
    headers.set("Pragma", "no-cache");
    headers.set("Cache-Control", "no-cache");
    headers.set("content-type", "application/json");
    headers.set("x-client-uuid", uuid2);
    headers.set("x-twitter-auth-type", "OAuth2Session");
    headers.set("x-twitter-client-language", "en");
    headers.set("x-twitter-active-user", "yes");
    headers.set("x-client-transaction-id", transactionId());
    headers.set("Sec-Fetch-Dest", "empty");
    headers.set("Sec-Fetch-Mode", "cors");
    headers.set("Sec-Fetch-Site", "same-origin");
    const csrfToken = document.cookie.match(/ct0=(\w+)/)?.[1];
    if (!csrfToken) throw new Error("Not found csrfToken");
    headers.set("x-csrf-token", csrfToken);
    return headers;
  }
  function homeForYouEntriesToItems(entries) {
    const items = [];
    const ids = [];
    let cursor;
    for (const entry of entries.entries) {
      if (entry.content.entryType === "TimelineTimelineItem" && !entry.entryId.startsWith("promoted-")) {
        items.push(entry.content);
        if (entry.content.itemContent.tweet_results.result.legacy?.id_str) {
          ids.push(entry.content.itemContent.tweet_results.result.legacy.id_str);
        }
        if (entry.content.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str) {
          ids.push(entry.content.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str);
        }
      } else if (entry.content.entryType === "TimelineTimelineModule" && entry.content.displayType === "VerticalConversation") {
        entry.content.items.forEach((i) => {
          items.push(i.item);
          if (i.item.itemContent.tweet_results.result.legacy?.id_str) {
            ids.push(i.item.itemContent.tweet_results.result.legacy?.id_str);
          }
          if (i.item.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str) {
            ids.push(i.item.itemContent.tweet_results.result.legacy?.retweeted_status_result?.result?.legacy?.id_str);
          }
        });
      } else if (entry.content.entryType === "TimelineTimelineCursor" && entry.entryId.startsWith("cursor-bottom")) {
        cursor = entry.content.value;
      }
    }
    return { items, ids, cursor };
  }

  class WnacgMatcher extends BaseMatcher {
    name() {
      return "绅士漫画";
    }
    meta;
    baseURL;
    galleryURL;
    async *fetchPagesSource() {
      const id = this.extractIDFromHref(window.location.href);
      if (!id) {
        throw new Error("Cannot find gallery ID");
      }
      this.baseURL = `${window.location.origin}/photos-index-page-1-aid-${id}.html`;
      this.galleryURL = `${window.location.origin}/photos-gallery-aid-${id}.html`;
      let doc = await window.fetch(this.baseURL).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
      this.meta = this.pasrseGalleryMeta(doc);
      let galleryImageList = await this.requestGalleryImages(this.galleryURL);
      yield Result.ok(galleryImageList);
    }
    async parseImgNodes(list) {
      const result = [];
      for (let index = 0; index < list.length; index++) {
        const img = list[index];
        let imgNode = new ImageNode("", img.url, img.caption, void 0, img.url);
        result.push(imgNode);
      }
      return result;
    }
    async fetchOriginMeta(node) {
      const url = node.originSrc ?? node.thumbnailSrc;
      const ext = url.includes(".") ? url.split(".").pop() : "jpg";
      const title = node.title.replace("[", "").replace("]", "") + "." + ext;
      return { url, title };
    }
    workURL() {
      return /(wnacg.com|wn\d{2}.cc)\/photos-index/;
    }
    galleryMeta(chapter) {
      return this.meta || super.galleryMeta(chapter);
    }
    // https://www.hm19.lol/photos-index-page-1-aid-253297.html
    extractIDFromHref(href) {
      const match = href.match(/-(\d+).html$/);
      if (!match) return void 0;
      return match[1];
    }
    pasrseGalleryMeta(doc) {
      const title = doc.querySelector("#bodywrap > h2")?.textContent || "unknown";
      const meta = new GalleryMeta(this.baseURL || window.location.href, title);
      const tags = Array.from(doc.querySelectorAll(".asTB .tagshow")).map((ele) => ele.textContent).filter(Boolean);
      const description = Array.from(doc.querySelector(".asTB > .asTBcell.uwconn > p")?.childNodes || []).map((e) => e.textContent).filter(Boolean);
      meta.tags = { "tags": tags, "description": description };
      return meta;
    }
    async requestGalleryImages(galleryURL) {
      const text = await window.fetch(galleryURL).then((res) => res.text());
      let js = "";
      for (let line of text.split("\n")) {
        line = line.replace('document.writeln("', "");
        line = line.replace('");', "");
        if (line.includes("var imglist")) {
          line = line.replace("var imglist = ", "");
          line = line.replaceAll("fast_img_host+\\", "");
          line = line.replaceAll("\\", "");
          js += line;
        }
      }
      return this.extractUrlsAndCaptions(js);
    }
    /*
    document.writeln("	<script type=\"text/javascript\"> ");
    document.writeln("		var sns_sys_id = '';");
    document.writeln("		var sns_view_point_token = '';");
    document.writeln("		var hash = window.location.hash;");
    document.writeln("		if(!hash){");
    document.writeln("			hash = 0;");
    document.writeln("		}else{");
    document.writeln("			hash = parseInt(hash.replace(\"#\",\"\")) - 1;");
    document.writeln("		}");
    document.writeln("		var fast_img_host=\"\";");
    document.writeln("		var imglist = [{ url: fast_img_host+\"//img5.qy0.ru/data/2940/25/001.jpg\", caption: \"[001]\"},{ url: fast_img_host+\"/themes/weitu/images/bg/shoucang.jpg\", caption: \"喜歡紳士漫畫的同學請加入收藏哦！\"}];");
    document.writeln("");
    document.writeln("		$(function(){");
    document.writeln("			imgscroll.beLoad($(\"#img_list\"),imglist,hash);");
    document.writeln("		});");
    document.writeln("	
    <\/script>
    ");
    */
    extractUrlsAndCaptions(inputStr) {
      const regex = /url:\s*"(.*?)",\s*caption:\s*"(.*?)"/gs;
      let match;
      const results = [];
      while ((match = regex.exec(inputStr)) !== null) {
        results.push({ url: match[1], caption: match[2] });
      }
      if (results.length > 0) {
        if (results[results.length - 1].caption.includes("加入收藏")) {
          results.pop();
        }
      }
      return results;
    }
  }

  class YabaiMatcher extends BaseMatcher {
    meta;
    name() {
      return "Yabai.si";
    }
    workURL() {
      return /yabai.si\/g\/\w+\/?$/;
    }
    title() {
      return this.meta?.title ?? document.title;
    }
    galleryMeta() {
      return this.meta;
    }
    async *fetchPagesSource() {
      const data = await this.query(window.location.href + "/read", `{"page":1}`);
      if (data.props?.pages?.data?.list) {
        const list = data.props?.pages?.data;
        yield Result.ok(list);
      } else {
        throw new Error("cannot fetch pages");
      }
    }
    async parseImgNodes(raw) {
      const items = this.buildList(raw);
      if (items.length === 0) throw new Error("cannot build list from gallery data");
      const page = Math.ceil(raw.count / 20);
      const data = await this.query(window.location.href, `{"page":${page}}`);
      const thumbnails = data.props?.post?.data?.page_list;
      if (!thumbnails) {
        throw new Error("cannot fetch thumbnails");
      }
      const meta = data.props?.post?.data;
      if (meta) this.meta = this.buildGalleryMeta(meta);
      const ret = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const thumb = thumbnails[i];
        ret.push(new ImageNode(thumb, item.url, `${item.name}.${item.ext}`, void 0, item.url));
      }
      return ret;
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    buildGalleryMeta(data) {
      const meta = new GalleryMeta(data.url, data.name);
      meta.originTitle = data.alt_name;
      meta.tags = {
        flag: [data.flag],
        category: [data.category],
        date: [data.date],
        ...data.tags
      };
      return meta;
    }
    // buildList in app.js
    buildList(data) {
      const list = data.list;
      const urls = [];
      for (let r = 0; r < data.count; r++) {
        const index = parseInt(list.head[r]) - 1;
        const name = list.head[r].padStart(4, "0");
        const url = "".concat(list.root, "/").concat(list.code.toString(), "/").concat(name, "-").concat(list.hash[r], "-").concat(list.rand[r], ".").concat(list.type[r]);
        urls[index] = { url, name, ext: list.type[r] };
      }
      return urls;
    }
    async query(url, body) {
      const csrf = document.cookie.match(/XSRF-TOKEN=(.*)?;?/)?.[1];
      if (!csrf) throw new Error("cannot get csrf token form cookie");
      const res = await window.fetch(url, {
        "headers": {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-Inertia": "true",
          "X-Inertia-Version": transactionId(),
          "X-XSRF-TOKEN": decodeURIComponent(csrf)
        },
        "body": body,
        "method": "POST"
      });
      return await res.json();
    }
  }

  class BakamhMatcher extends BaseMatcher {
    name() {
      return "Bakamh";
    }
    workURL() {
      return /bakamh.com\/manga\/[^\/]+\/$/;
    }
    async fetchChapters() {
      const elements = Array.from(document.querySelectorAll(".listing-chapters_wrap li > a"));
      return elements.map((elem, i) => {
        const title = elem.textContent?.trim() ?? "untitled-" + (i + 1);
        return new Chapter(i, title, elem.href);
      });
    }
    async *fetchPagesSource(ch) {
      yield Result.ok(ch.source);
    }
    async parseImgNodes(source) {
      const raw = await window.fetch(source).then((resp) => resp.text()).catch(Error);
      if (raw instanceof Error) throw raw;
      const queryImages = (docRaw) => {
        const doc = new DOMParser().parseFromString(docRaw, "text/html");
        return Array.from(doc.querySelectorAll(".read-container div > img"));
      };
      let images = queryImages(raw);
      if (images.length === 0) {
        const raw_key_raw = raw.match(/var raw_key\s?\=\s?\[([\d,]*)\];/)?.[1];
        if (!raw_key_raw) throw new Error("cannot find raw_key from chapter: " + source);
        const raw_key = raw_key_raw.split(",").map((s) => parseInt(s));
        const encrypted = raw.match(/var encrypted\s?\=\s?"(\w+)";/)?.[1];
        if (!encrypted) throw new Error("cannot find encrypted from chapter: " + source);
        let tag = void 0;
        let iv_raw = raw.match(/var iv\s?\=\s?\[([\d,]*)\]/)?.[1];
        if (!iv_raw) {
          iv_raw = raw.match(/var iv\s?\=\s?new Uint8Array\(\[([\d,]+)\]\)/)?.[1];
          if (!iv_raw) throw new Error("cannot find iv from chapter: " + source);
          tag = raw.match(/var tag\s?\=\s?new Uint8Array\(\[([\d,]+)\]\)/)?.[1]?.split(",").map((s) => parseInt(s));
        }
        const iv = iv_raw.split(",").map((s) => parseInt(s));
        try {
          const docRaw = this.decrypt(raw_key, encrypted, iv, tag);
          images = queryImages(docRaw);
        } catch (error) {
          throw new Error("decrypt failed: " + error);
        }
      }
      if (images.length === 0) throw new Error("cannot find images from chapter: " + source);
      return images.map((image) => new ImageNode("", source, `${image.id}.${image.src.split(".").pop() ?? "jpg"}`, void 0, image.src));
    }
    headers() {
      return {
        "Accept": "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5",
        "Accept-Language": "en-US,en;q=0.7,zh-CN;q=0.3",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Referer": "https://bakamh.com/"
      };
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
    meta;
    galleryMeta() {
      if (this.meta) return this.meta;
      let title = document.querySelector("#manga-title h1")?.textContent ?? document.title;
      title = title.replaceAll(/\s/g, "");
      const meta = new GalleryMeta(window.location.href, title);
      const items = Array.from(document.querySelectorAll(".post-content > .post-content_item"));
      items.forEach((item) => {
        const cate = item.querySelector(".summary-heading")?.textContent?.trim();
        if (!cate) return;
        const author = item.querySelector(".summary-content > .author-content > a")?.textContent;
        if (author) meta.tags[cate] = [author];
        const genres = item.querySelector(".summary-content > .genres-content > a")?.textContent;
        if (genres) meta.tags[cate] = [genres];
        const tags = Array.from(item.querySelectorAll(".summary-content > .tags-content > a")).map((a) => a.textContent).filter(Boolean);
        if (tags && tags.length > 0) meta.tags[cate] = tags;
      });
      this.meta = meta;
      return this.meta;
    }
    decrypt(raw_key, encrypted, iv, tag) {
      const fg = forge;
      const decipher = fg.cipher.createDecipher("AES-OFB", raw_key);
      if (tag) {
        decipher.start({ iv: new Uint8Array(iv), tags: new Uint8Array(tag) });
      } else {
        decipher.start({ iv });
      }
      const u8Data = new Uint8Array(encrypted.match(/.{1,2}/g).map((m) => parseInt(m, 16)));
      decipher.update(fg.util.createBuffer(u8Data));
      if (decipher.finish()) {
        return decipher.output.data;
      } else {
        throw new Error("decipher unfinished");
      }
    }
  }

  class MangaParkMatcher extends BaseMatcher {
    name() {
      return "MangaPark";
    }
    // https://mangapark.net/title/426777-en-i-said-i-d-make-science-content-so-why-are-all-my-fans-witches
    workURL() {
      return /mangapark.(net|com)\/title\/[^/]+$/;
    }
    async fetchChapters() {
      const list = Array.from(document.querySelectorAll("div[data-name='chapter-list'] .flex-col > .px-2 > .space-x-1 > a"));
      return list.map((elem, i) => new Chapter(i, elem.textContent ?? "Chapter" + (i + 1), elem.href));
    }
    async *fetchPagesSource(source) {
      yield Result.ok(source.source);
    }
    async parseImgNodes(href) {
      const doc = await window.fetch(href).then((resp) => resp.text()).then((text) => new DOMParser().parseFromString(text, "text/html")).catch(Error);
      if (doc instanceof Error) throw doc;
      const elements = Array.from(doc.querySelectorAll("div[data-name='image-item'] > div"));
      const digits = elements.length.toString().length;
      return elements.map((elem, i) => {
        const src = elem.querySelector("img")?.src;
        if (!src) throw new Error("cannot find image from chapter: " + href);
        const ext = src.split(".").pop() ?? "jpg";
        const title = (i + 1).toString().padStart(digits, "0") + "." + ext;
        const [w, h] = [parseInt(elem.style.width), parseInt(elem.style.height)];
        const node = new ImageNode("", href, title, void 0, src, { w, h });
        return node;
      });
    }
    async fetchOriginMeta(node) {
      return { url: node.originSrc };
    }
  }

  class Hentai3Matcher extends BaseMatcher {
    name() {
      return "3Hentai";
    }
    workURL() {
      return /3hentai.net\/d\/\d+$/;
    }
    async *fetchPagesSource() {
      yield Result.ok(document);
    }
    async parseImgNodes(doc) {
      const elements = Array.from(doc.querySelectorAll(".single-thumb > a"));
      const digits = elements.length.toString().length;
      const nodes = elements.map((elem, i) => {
        const href = elem.href;
        const img = elem.querySelector("img.lazy");
        if (!img) throw new Error("cannot find image element");
        const thumb = img.getAttribute("data-src") ?? "";
        const ext = thumb.split(".").pop() ?? "jpg";
        const title = (i + 1).toString().padStart(digits, "0") + "." + ext;
        const node = new ImageNode(thumb, href, title, void 0, void 0, { w: img.width, h: img.height });
        return node;
      });
      if (nodes.length === 0) {
        throw new Error("cannot find images by css selector: .single-thumb > a");
      }
      const firstImageDoc = await window.fetch(nodes[0].href).then((resp) => resp.text()).then((text) => new DOMParser().parseFromString(text, "text/html")).catch(Error);
      if (firstImageDoc instanceof Error) throw firstImageDoc;
      const scriptElem = Array.from(firstImageDoc.querySelectorAll("script")).find((elem) => elem.textContent?.trimStart().startsWith("var readerPages "));
      const pagesRaw = scriptElem?.textContent?.match(/var readerPages = JSON\.parse\(atob\("(.*)?\"\)\)/)?.[1];
      if (pagesRaw) {
        const pages = JSON.parse(window.atob(pagesRaw));
        nodes.forEach((node, i) => {
          const page = pages.pages[(i + 1).toString()];
          if (!page) return;
          node.title = page.f ?? node.title;
          node.originSrc = pages.baseUriImg.replace("%s", page.f);
          node.rect = { w: page.w, h: page.h };
        });
      }
      return nodes;
    }
    async fetchOriginMeta(node) {
      if (node.originSrc) return { url: node.originSrc };
      const doc = await window.fetch(node.href).then((resp) => resp.text()).then((text) => new DOMParser().parseFromString(text, "text/html")).catch(Error);
      if (doc instanceof Error) throw doc;
      const image = doc.querySelector(".js-main-img");
      if (!image) throw new Error("cannot find image from: " + node.href);
      return { url: image.src, title: image.src.split("/").pop() ?? node.title };
    }
    meta;
    galleryMeta() {
      if (this.meta) return this.meta;
      const title = document.querySelector("#main-info > h1")?.textContent ?? document.title;
      const meta = new GalleryMeta(window.location.href, title);
      Array.from(document.querySelectorAll(".tag-container.field-name")).forEach((elem) => {
        const cate = elem.firstChild?.textContent?.trim()?.replace(":", "")?.toLowerCase();
        const filterElem = Array.from(elem.querySelectorAll("span.filter-elem"));
        if (cate && filterElem.length > 0) {
          const tags = filterElem.map((elem2) => elem2.textContent?.trim()).filter(Boolean);
          meta.tags[cate] = tags;
        }
      });
      this.meta = meta;
      return this.meta;
    }
  }

  class BilibiliMatcher extends BaseMatcher {
    name() {
      return "Bilibili";
    }
    workURL() {
      return /space.bilibili.com\/\d+\/upload\/opus$/;
    }
    async *fetchPagesSource() {
      const host_mid = window.location.href.match(/space.bilibili.com\/(\d+)\//)?.[1];
      if (!host_mid) throw new Error("cannot find host_mid from " + window.location.href);
      const webid = document.querySelector("script#__RENDER_DATA__")?.textContent?.match(/%3A%22([\w\.\-_]*)%22/)?.[1];
      if (!webid) throw new Error("cannot find webid");
      let offset = "";
      let page = 1;
      while (true) {
        const rid = transactionId();
        const wts = Date.now().toString();
        const data = await fetch(`https://api.bilibili.com/x/polymer/web-dynamic/v1/opus/feed/space?host_mid=${host_mid}&page=${page}&offset=${offset}&type=all&web_location=333.1387&w_webid=${webid}&w_rid=${rid}&wts=${wts}`, {
          "credentials": "include",
          "headers": {
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site"
          },
          "referrer": window.location.href,
          "method": "GET",
          "mode": "cors"
        }).then((resp) => resp.json());
        if (data.code !== 0) {
          yield Result.err(new Error("fetch opus error: " + data.message));
        }
        if (data.data.items.length === 0) {
          yield Result.err(new Error("fetch opus zero"));
        }
        if (data.data.has_more) {
          offset = data.data.offset;
          page = page + 1;
          const items = [...data.data.items];
          while (items.length > 0) {
            yield Result.ok(items.splice(0, 2));
            await sleep(1e3);
          }
        } else {
          return;
        }
      }
    }
    async parseImgNodes(items) {
      const raws = [];
      for (const item of items) {
        const raw = await simpleFetch(`https://www.bilibili.com/opus/${item.opus_id}?spm_id_from=333.1387.0.0`, "text", {
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.7,zh-CN;q=0.3",
          "Upgrade-Insecure-Requests": "1",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "same-site",
          "Sec-Fetch-User": "?1",
          "Priority": "u=0, i",
          "Origin": "https://space.bilibili.com",
          "Cookie": document.cookie,
          "Referrer": window.location.href
        });
        if (raw.match("<title>验证码_哔哩哔哩</title>")) {
          throw new Error("触发风控，请打开此链接处理验证码：https:" + item.jump_url);
        }
        raws.push(raw);
      }
      const details = raws.map((raw) => {
        const j = raw.match(/window.__INITIAL_STATE__=(\{.*\});/)?.[1];
        if (!j) throw new Error("fetch opus error: cannot find windows.__INITIAL_STATE__");
        const detail = JSON.parse(j)?.detail;
        if (!detail) throw new Error("fetch opus error: cannot find detail from windows.__INITIAL_STATE__");
        return detail;
      });
      if (items.length !== details.length) throw new Error(`fetch opus detail error, opus count: ${items.length}, detail count: ${details.length}`);
      return items.map((item, i) => {
        const detail = details[i];
        const pictures = detail.modules.filter((modu) => modu.module_type === "MODULE_TYPE_CONTENT" || modu.module_type === "MODULE_TYPE_TOP").map((modu) => modu.module_top?.display.album.pics ?? modu.module_content?.paragraphs.filter((para) => para.pic).map((para) => para.pic?.pics ?? []).flat() ?? []).flat();
        if (!pictures) throw new Error("cannot find opus content: " + item.jump_url);
        const digits = pictures.length.toString().length;
        return pictures.map((pic, j) => {
          const title = item.opus_id + "-" + (j + 1).toString().padStart(digits, "0");
          return new ImageNode(j === 0 ? item.cover.url : "", item.jump_url, title, void 0, pic.url, { w: pic.width, h: pic.height });
        });
      }).flat();
    }
    async fetchOriginMeta(node) {
      const ext = node.originSrc?.split(".").pop() ?? "jpg";
      return { url: node.originSrc, title: node.title + "." + ext };
    }
  }

  class AsmHentaiMatcher extends BaseMatcher {
    name() {
      return "AsmHentai";
    }
    workURL() {
      return /asmhentai.com\/g\/\d+\/?$/;
    }
    async *fetchPagesSource() {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
      if (!csrf) throw new Error("cannot find csrf_token");
      const loadID = document.querySelector("#load_id")?.value;
      if (!loadID) throw new Error("cannot find load_id");
      const loadDir = document.querySelector("#load_dir")?.value;
      if (!loadDir) throw new Error("cannot find load_dir");
      const pages = document.querySelector("#t_pages")?.value;
      if (!pages) throw new Error("cannot find t_pages");
      const api = window.location.origin + "/inc/thumbs_loader.php";
      const raw = await window.fetch(api, {
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest"
        },
        "body": `_token=${csrf}&id=${loadID}&dir=${loadDir}&visible_pages=0&t_pages=${pages}&type=2`,
        "method": "POST"
      }).then((resp) => resp.text()).catch(Error);
      if (raw instanceof Error) throw raw;
      yield Result.ok(raw);
    }
    async parseImgNodes(raw) {
      const infos = Array.from(raw.matchAll(/<a href="(.*?)".*data-src="(.*?)"/g)).filter((m) => m.length === 3).map((m) => [m[1], m[2]]);
      const digits = infos.length.toString().length;
      return infos.map((info, i) => new ImageNode(info[1], window.location.origin + info[0], (i + 1).toString().padStart(digits, "0")));
    }
    async fetchOriginMeta(node) {
      const href = node.href;
      const doc = await window.fetch(href).then((resp) => resp.text()).then((text) => new DOMParser().parseFromString(text, "text/html")).catch(Error);
      if (doc instanceof Error) throw doc;
      const src = doc.querySelector("#fimg")?.getAttribute("data-src");
      if (!src) throw new Error("cannot find image from: " + href);
      const ext = src.split(".").pop() ?? "jpg";
      return { url: src, title: node.title + "." + ext };
    }
    meta;
    galleryMeta() {
      if (this.meta) return this.meta;
      const title = document.querySelector(".right > .info > h1")?.textContent ?? document.title;
      const meta = new GalleryMeta(window.location.href, title);
      meta.originTitle = document.querySelector(".right > .info > h2")?.textContent ?? void 0;
      Array.from(document.querySelectorAll(".right > .info > ul > .tags")).forEach((elem) => {
        const cate = elem.querySelector("h3")?.textContent?.trim().replace(":", "").toLowerCase();
        if (cate) {
          const tags = Array.from(elem.querySelectorAll(".tag_list > a > span")).map(
            (span) => span.firstChild?.textContent ?? void 0
          ).filter(Boolean);
          if (tags.length > 0) {
            meta.tags[cate] = tags;
          }
        }
      });
      this.meta = meta;
      return this.meta;
    }
  }

  function getMatchers() {
    return [
      new EHMatcher(),
      new NHMatcher(),
      new NHxxxMatcher(),
      new HitomiMather(),
      new PixivMatcher(),
      new SteamMatcher(),
      new RokuHentaiMatcher(),
      new Comic18Matcher(),
      new DanbooruDonmaiMatcher(),
      new Rule34Matcher(),
      new YandereMatcher(),
      new KonachanMatcher(),
      new GelBooruMatcher(),
      new IMHentaiMatcher(),
      new TwitterMatcher(),
      new WnacgMatcher(),
      new HentaiNexusMatcher(),
      new KoharuMatcher(),
      new MHGMatcher(),
      new MangaCopyMatcher(),
      new E621Matcher(),
      new ArcaMatcher(),
      new ArtStationMatcher(),
      new AkumaMatcher(),
      new InstagramMatcher(),
      new ColaMangaMatcher(),
      new YabaiMatcher(),
      new Hanime1Matcher(),
      new MyComicMatcher(),
      new KemonoMatcher(),
      new HentaiZapMatcher(),
      new MiniServeMatcher(),
      new BakamhMatcher(),
      new MangaParkMatcher(),
      new Hentai3Matcher(),
      new BilibiliMatcher(),
      new AsmHentaiMatcher()
    ];
  }
  function adaptMatcher(url) {
    const matchers = getMatchers();
    const matcher = matchers.filter((matcher2) => conf.siteProfiles[matcher2.name()]?.enable ?? true).find((matcher2) => {
      let workURLs = matcher2.workURLs();
      if (conf.siteProfiles[matcher2.name()] && conf.siteProfiles[matcher2.name()].workURLs.length > 0) {
        workURLs = conf.siteProfiles[matcher2.name()].workURLs.map((regex) => new RegExp(regex));
      }
      return workURLs.find((regex) => regex.test(url));
    });
    if (!matcher) return [null, false, false];
    return [
      matcher,
      conf.siteProfiles[matcher.name()]?.enableAutoOpen ?? true,
      conf.siteProfiles[matcher.name()]?.enableFlowVision ?? true
    ];
  }

  function parseKey(event) {
    const keys = [];
    if (event.ctrlKey) keys.push("ctrl");
    if (event.shiftKey) keys.push("shift");
    if (event.altKey) keys.push("alt");
    if (event.metaKey) keys.push("meta");
    if (event instanceof KeyboardEvent) {
      let key = event.key;
      if (key === " ") key = "space";
      keys.push(key);
    }
    if (event instanceof MouseEvent) {
      let key = "m" + event.button;
      keys.push(key);
    }
    return keys.join("+").toLowerCase();
  }

  function relocateElement(element, anchor, vw, vh) {
    const rect = anchor.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - element.offsetWidth / 2;
    left = Math.min(left, vw - element.offsetWidth);
    left = Math.max(left, 0);
    element.style.left = left + "px";
    if (rect.top > vh / 2) {
      element.style.bottom = vh - rect.top + "px";
      element.style.top = "unset";
    } else {
      element.style.top = rect.bottom + "px";
      element.style.bottom = "unset";
    }
  }

  function createInputElement(root, anchor, callback) {
    const element = document.createElement("div");
    element.style.position = "fixed";
    element.style.lineHeight = "2em";
    element.id = "input-element";
    element.innerHTML = `<input type="text" style="width:20em;height:2em;"><button class="ehvp-custom-btn ehvp-custom-btn-plain">&nbsp√&nbsp</button>`;
    root.appendChild(element);
    const input = element.querySelector("input");
    const button = element.querySelector("button");
    button.addEventListener("click", () => {
      callback(input.value);
      element.remove();
    });
    relocateElement(element, anchor, root.offsetWidth, root.offsetHeight);
  }
  function createWorkURLs(workURLs, container, onRemove) {
    const urls = workURLs.map((regex) => `<div><span style="user-select: text;">${regex}</span><span class="ehvp-custom-btn ehvp-custom-btn-plain" data-value="${regex}">&nbspx&nbsp</span></div>`);
    container.innerHTML = urls.join("");
    Array.from(container.querySelectorAll("div > span + span")).forEach((element) => {
      element.addEventListener("click", () => {
        onRemove(element.getAttribute("data-value"));
        element.parentElement.remove();
      });
    });
  }
  function createSiteProfilePanel(root, onclose) {
    const matchers = getMatchers();
    const listItems = matchers.map((matcher) => {
      const name = matcher.name();
      const id = "id-" + b64EncodeUnicode(name).replaceAll(/[+=\/]/g, "-");
      const profile = conf.siteProfiles[name];
      return `<li data-index="${id}" class="ehvp-custom-panel-list-item">
             <div class="ehvp-custom-panel-list-item-title">
               <div style="font-size: 1.2em;font-weight: 800;">${name}</div>
               <div>
                 <label class="ehvp-custom-panel-checkbox"><span>${i18n.enable.get()}: </span><input id="${id}-enable-checkbox" ${profile?.enable ?? true ? "checked" : ""} type="checkbox"></label>
                 <label class="ehvp-custom-panel-checkbox"><span>${i18n.enableAutoOpen.get()}: </span><input id="${id}-enable-auto-open-checkbox" ${profile?.enableAutoOpen ?? true ? "checked" : ""} type="checkbox"></label>
                 <label class="ehvp-custom-panel-checkbox"><span>${i18n.enableFlowVision.get()}: </span><input id="${id}-enable-flow-vision-checkbox" ${profile?.enableFlowVision ?? true ? "checked" : ""} type="checkbox"></label>
                 <label class="ehvp-custom-panel-checkbox"><span>${i18n.addRegexp.get()}: </span><span id="${id}-add-workurl" class="ehvp-custom-btn ehvp-custom-btn-green">&nbsp+&nbsp</span></label>
               </div>
             </div>
             <div id="${id}-workurls"></div>
           </li>`;
    });
    const HTML_STR = `
<div class="ehvp-custom-panel">
  <div class="ehvp-custom-panel-title">
    <span>
      <span>${i18n.showSiteProfiles.get()}</span>
      <span style="font-size:0.5em;">
        <span class="p-tooltip"> ${i18n.enable.get()}? <span class="p-tooltiptext">${i18n.enableTooltips.get()}</span></span>
        <span class="p-tooltip"> ${i18n.enableAutoOpen.get()}? <span class="p-tooltiptext">${i18n.enableAutoOpenTooltips.get()}</span></span>
        <span class="p-tooltip"> ${i18n.enableFlowVision.get()}? <span class="p-tooltiptext">${i18n.enableFlowVisionTooltips.get()}</span></span>
      </span>
    </span>
    <span id="ehvp-custom-panel-close" class="ehvp-custom-panel-close">✖</span>
  </div>
  <div class="ehvp-custom-panel-container">
    <div class="ehvp-custom-panel-content">
      <ul class="ehvp-custom-panel-list">
      ${listItems.join("")}
      </ul>
    </div>
  </div>
</div>
`;
    const fullPanel = document.createElement("div");
    fullPanel.classList.add("ehvp-full-panel");
    fullPanel.innerHTML = HTML_STR;
    const close = () => {
      fullPanel.remove();
      onclose?.();
    };
    fullPanel.addEventListener("click", (event) => {
      if (event.target.classList.contains("ehvp-full-panel")) {
        close();
      }
    });
    root.appendChild(fullPanel);
    fullPanel.querySelector(".ehvp-custom-panel-close").addEventListener("click", close);
    const siteProfiles = conf.siteProfiles;
    matchers.forEach((matcher) => {
      const name = matcher.name();
      const id = "id-" + b64EncodeUnicode(name).replaceAll(/[+=\/]/g, "-");
      const defaultWorkURLs = matcher.workURLs().map((u) => u.source);
      const getProfile = () => {
        let profile = siteProfiles[name];
        if (!profile) {
          profile = { enable: true, enableAutoOpen: true, enableFlowVision: true, workURLs: [...defaultWorkURLs] };
          siteProfiles[name] = profile;
        }
        return profile;
      };
      const enableCheckbox = q(`#${id}-enable-checkbox`, fullPanel);
      enableCheckbox.addEventListener("click", () => {
        getProfile().enable = enableCheckbox.checked;
        saveConf(conf);
      });
      const enableAutoOpenCheckbox = q(`#${id}-enable-auto-open-checkbox`, fullPanel);
      enableAutoOpenCheckbox.addEventListener("click", () => {
        getProfile().enableAutoOpen = enableAutoOpenCheckbox.checked;
        saveConf(conf);
      });
      const enableFlowVisionCheckbox = q(`#${id}-enable-flow-vision-checkbox`, fullPanel);
      enableFlowVisionCheckbox.addEventListener("click", () => {
        getProfile().enableFlowVision = enableFlowVisionCheckbox.checked;
        saveConf(conf);
      });
      const addWorkURL = q(`#${id}-add-workurl`, fullPanel);
      const workURLContainer = q(`#${id}-workurls`, fullPanel);
      const removeWorkURL = (value, profile) => {
        const index = profile.workURLs.indexOf(value);
        let changed = false;
        if (index > -1) {
          profile.workURLs.splice(index, 1);
          changed = true;
        }
        if (profile.workURLs.length === 0) {
          profile.workURLs = [...defaultWorkURLs];
          changed = true;
          createWorkURLs(defaultWorkURLs, workURLContainer, (value2) => {
            removeWorkURL(value2, getProfile());
          });
        }
        if (changed) saveConf(conf);
      };
      addWorkURL.addEventListener("click", () => {
        const background = document.createElement("div");
        background.addEventListener("click", (event) => event.target === background && background.remove());
        background.setAttribute("style", "position:absolute;width:100%;height:100%;");
        fullPanel.appendChild(background);
        createInputElement(background, addWorkURL, (value) => {
          if (!value) return;
          try {
            new RegExp(value);
          } catch (_) {
            return;
          }
          background.remove();
          const profile = getProfile();
          profile.workURLs.push(value);
          saveConf(conf);
          createWorkURLs(getProfile().workURLs, workURLContainer, (value2) => {
            removeWorkURL(value2, getProfile());
          });
        });
      });
      let workURLs = defaultWorkURLs;
      if (siteProfiles[name]) {
        if (siteProfiles[name].workURLs.length === 0) {
          siteProfiles[name].workURLs.push(...defaultWorkURLs);
        } else {
          workURLs = siteProfiles[name].workURLs;
        }
      }
      createWorkURLs(workURLs, workURLContainer, (value) => {
        removeWorkURL(value, getProfile());
      });
    });
    fullPanel.querySelectorAll(".p-tooltip").forEach((element) => {
      const child = element.querySelector(".p-tooltiptext");
      if (!child) return;
      element.addEventListener("mouseenter", () => {
        child.style.display = "block";
        relocateElement(child, element, root.offsetWidth, root.offsetHeight);
      });
      element.addEventListener("mouseleave", () => child.style.display = "none");
    });
  }

  function createHelpPanel(root, onclose) {
    const HTML_STR = `
<div class="ehvp-custom-panel">
  <div class="ehvp-custom-panel-title">
    <span>${i18n.showHelp.get()}</span>
    <span id="ehvp-custom-panel-close" class="ehvp-custom-panel-close">✖</span>
  </div>
  <div class="ehvp-custom-panel-container ehvp-help-panel">
    <div class="ehvp-custom-panel-content">${i18n.help.get()}</div>
  </div>
</div>
`;
    const fullPanel = document.createElement("div");
    fullPanel.classList.add("ehvp-full-panel");
    fullPanel.innerHTML = HTML_STR;
    const close = () => {
      fullPanel.remove();
      onclose?.();
    };
    fullPanel.addEventListener("click", (event) => {
      if (event.target.classList.contains("ehvp-full-panel")) {
        close();
      }
    });
    root.appendChild(fullPanel);
    fullPanel.querySelector(".ehvp-custom-panel-close").addEventListener("click", close);
  }

  function createKeyboardCustomPanel(keyboardEvents, root, onclose) {
    function addKeyboardDescElement(button, category, id, key) {
      const str = `<span data-id="${id}" data-key="${key}" class="ehvp-custom-panel-item-value"><span>${key}</span><span class="ehvp-custom-btn ehvp-custom-btn-plain" style="padding:0;border:none;">&nbspx&nbsp</span></span>`;
      const tamplate = document.createElement("div");
      tamplate.innerHTML = str;
      const element = tamplate.firstElementChild;
      button.before(element);
      element.querySelector(".ehvp-custom-btn").addEventListener("click", (event) => {
        const keys = conf.keyboards[category][id];
        if (keys && keys.length > 0) {
          const index = keys.indexOf(key);
          if (index !== -1) keys.splice(index, 1);
          if (keys.length === 0) {
            delete conf.keyboards[category][id];
          }
          saveConf(conf);
        }
        event.target.parentElement.remove();
        const values = Array.from(button.parentElement.querySelectorAll(".ehvp-custom-panel-item-value"));
        if (values.length === 0) {
          const desc = keyboardEvents[category][id];
          desc.defaultKeys.forEach((key2) => addKeyboardDescElement(button, category, id, key2));
        }
      });
      tamplate.remove();
    }
    const HTML_STR = `
<div class="ehvp-custom-panel">
  <div class="ehvp-custom-panel-title">
    <span>${i18n.showKeyboard.get()}</span>
    <span id="ehvp-custom-panel-close" class="ehvp-custom-panel-close">✖</span>
  </div>
  <div class="ehvp-custom-panel-container">
    <div class="ehvp-custom-panel-content">
      ${Object.entries(keyboardEvents.inMain).map(([id]) => `
        <div class="ehvp-custom-panel-item">
         <div class="ehvp-custom-panel-item-title">
           <span>${i18n.keyboard[id].get()}</span>
         </div>
         <div class="ehvp-custom-panel-item-values">
           <!-- wait element created from button event -->
           <button class="ehvp-add-keyboard-btn ehvp-custom-btn ehvp-custom-btn-green" style="margin-left: 0.2em;" data-cate="inMain" data-id="${id}">+</button>
         </div>
        </div>
      `).join("")}
    </div>
    <div class="ehvp-custom-panel-content">
      ${Object.entries(keyboardEvents.inFullViewGrid).map(([id]) => `
        <div class="ehvp-custom-panel-item">
         <div class="ehvp-custom-panel-item-title">
           <span>${i18n.keyboard[id].get()}</span>
         </div>
         <div class="ehvp-custom-panel-item-values">
           <!-- wait element created from button event -->
           <button class="ehvp-add-keyboard-btn ehvp-custom-btn ehvp-custom-btn-green" style="margin-left: 0.2em;" data-cate="inFullViewGrid" data-id="${id}">+</button>
         </div>
        </div>
      `).join("")}
    </div>
    <div class="ehvp-custom-panel-content">
      ${Object.entries(keyboardEvents.inBigImageMode).map(([id]) => `
        <div class="ehvp-custom-panel-item">
         <div class="ehvp-custom-panel-item-title">
           <span>${i18n.keyboard[id].get()}</span>
         </div>
         <div class="ehvp-custom-panel-item-values">
           <!-- wait element created from button event -->
           <button class="ehvp-add-keyboard-btn ehvp-custom-btn ehvp-custom-btn-green" style="margin-left: 0.2em;display:inline-block;" data-cate="inBigImageMode" data-id="${id}">+</button>
         </div>
        </div>
      `).join("")}
    </div>
  </div>
</div>
`;
    const fullPanel = document.createElement("div");
    fullPanel.classList.add("ehvp-full-panel");
    fullPanel.innerHTML = HTML_STR;
    const close = () => {
      fullPanel.remove();
      onclose?.();
    };
    fullPanel.addEventListener("click", (event) => {
      if (event.target.classList.contains("ehvp-full-panel")) {
        close();
      }
    });
    root.appendChild(fullPanel);
    fullPanel.querySelector(".ehvp-custom-panel-close").addEventListener("click", close);
    fullPanel.querySelectorAll(".ehvp-add-keyboard-btn").forEach((button) => {
      const category = button.getAttribute("data-cate");
      const id = button.getAttribute("data-id");
      let keys = conf.keyboards[category][id];
      if (keys === void 0 || keys.length === 0) {
        keys = keyboardEvents[category][id].defaultKeys;
      }
      keys.forEach((key) => addKeyboardDescElement(button, category, id, key));
      const addKeyBoardDesc = (event) => {
        event.preventDefault();
        if (event instanceof KeyboardEvent) {
          const checkKey = event.key.toLowerCase();
          if (checkKey === "alt" || checkKey === "shift" || checkKey === "control" || checkKey === "meta") return;
        }
        const key = parseKey(event);
        if (conf.keyboards[category][id] !== void 0) {
          conf.keyboards[category][id].push(key);
        } else {
          conf.keyboards[category][id] = keys.concat(key);
        }
        saveConf(conf);
        addKeyboardDescElement(button, category, id, key);
        button.textContent = "+";
        button.removeAttribute("d-pressing");
        button.removeEventListener("keyup", addKeyBoardDesc);
        button.removeEventListener("mouseup", addKeyBoardDesc);
      };
      button.addEventListener("click", (event) => {
        event.preventDefault();
        button.textContent = "Press Key";
        button.setAttribute("d-pressing", "");
        button.addEventListener("keyup", addKeyBoardDesc, { once: false });
        button.addEventListener("mouseup", addKeyBoardDesc, { once: false });
      });
      button.addEventListener("mouseleave", () => {
        button.textContent = "+";
        button.removeAttribute("d-pressing");
        button.removeEventListener("keyup", addKeyBoardDesc);
        button.removeEventListener("mouseup", addKeyBoardDesc);
      });
    });
  }

  function createControlBar() {
    const displayText = getDisplayText();
    return `
<div class="b-main" style="flex-direction:row;">
  <a class="b-main-item s-pickable" data-key="entry">${displayText.entry}</a>
  <a class="b-main-item s-pickable" data-key="collapse">${displayText.collapse}</a>
  <div class="b-main-item">
      <a class="" style="color:#ffc005;">1</a><span id="p-slash-1">/</span><span id="p-total">0</span>
  </div>
  <div class="b-main-item s-pickable" data-key="fin">
      <span>${displayText.fin}:</span><span id="p-finished">0</span>
  </div>
  <a class="b-main-item s-pickable" data-key="autoPagePlay" data-status="play">
     <span>${displayText.autoPagePlay}</span>
  </a>
  <a class="b-main-item s-pickable" data-key="autoPagePause" data-status="paused">
     <span>${displayText.autoPagePause}</span>
  </a>
  <a class="b-main-item s-pickable" data-key="config">${displayText.config}</a>
  <a class="b-main-item s-pickable" data-key="download">${displayText.download}</a>
  <a class="b-main-item s-pickable" data-key="chapters">${displayText.chapters}</a>
  <a class="b-main-item s-pickable" data-key="filter">${displayText.filter}</a>
  <div class="b-main-item">
      <div id="read-mode-select"
      ><a class="b-main-option b-main-option-selected s-pickable" data-key="pagination" data-value="pagination">${displayText.pagination}</a
      ><a class="b-main-option s-pickable" data-key="continuous" data-value="continuous">${displayText.continuous}</a
      ><a class="b-main-option s-pickable" data-key="horizontal" data-value="horizontal">${displayText.horizontal}</a></div>
  </div>
  <div class="b-main-item">
      <span>
        <a class="b-main-btn" type="button">&lt;</a>
        <a class="b-main-btn" type="button">-</a>
        <span class="b-main-input">1</span>
        <a class="b-main-btn" type="button">+</a>
        <a class="b-main-btn" type="button">&gt;</a>
      </span>
  </div>
  <div class="b-main-item">
      <span>
        <span>${icons.zoomIcon}</span>
        <a class="b-main-btn" type="button">-</a>
        <span class="b-main-input" style="width: 3rem; cursor: move;">100</span>
        <a class="b-main-btn" type="button">+</a>
      </span>
  </div>
</div>`;
  }
  function createStyleCustomPanel(root, onclose) {
    const HTML_STR = `
<div class="ehvp-custom-panel" style="min-width:30vw;">
  <div class="ehvp-custom-panel-title">
    <span>${i18n.showStyleCustom.get()}</span>
    <span id="ehvp-custom-panel-close" class="ehvp-custom-panel-close">✖</span>
  </div>
  <div class="ehvp-custom-panel-container">
    <div class="ehvp-custom-panel-content">
      <div id="control-bar-example-container"></div>
      <div style="margin-top:1em;line-height:2em;">
        <input id="b-main-btn-custom-input" style="width: 30%;" type="text">
        <span id="b-main-btn-custom-confirm" class="ehvp-custom-btn ehvp-custom-btn-green">&nbspOk&nbsp</span>
        <span id="b-main-btn-custom-reset" class="ehvp-custom-btn ehvp-custom-btn-plain">&nbspReset&nbsp</span>
        <span id="b-main-btn-custom-preset1" class="ehvp-custom-btn ehvp-custom-btn-plain">&nbspPreset1&nbsp</span>
        <span id="b-main-btn-custom-preset2" class="ehvp-custom-btn ehvp-custom-btn-plain">&nbspPreset2&nbsp</span>
      </div>
      <div><span style="font-size:0.6em;color:#888;">${i18n.controlBarStyleTooltip.get()}</span></div>
    </div>
    <div class="ehvp-custom-panel-content" style="position:relative;">
      <div>
        <span class="ehvp-style-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="0">Preset 1</span>
        <span class="ehvp-style-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="1">Preset 2</span>
        <span class="ehvp-style-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="2">Preset 3</span>
        <span class="ehvp-style-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="3">Preset 4</span>
        <span class="ehvp-style-preset-btn ehvp-custom-btn ehvp-custom-btn-plain" data-index="99">Reset</span>
      </div>
      <textarea id="style-custom-input" style="width: 100%; height: 50vh;border:none;background-color:#00000090;color:#97ff97;text-align:left;vertical-align:top;font-size:1.2em;font-weight:600;">${conf.customStyle ?? ""}</textarea>
      <span style="position:absolute;bottom:2em;right:1em;" class="ehvp-custom-btn ehvp-custom-btn-green" id="style-custom-confirm">&nbspApply&nbsp</span>
    </div>
  </div>
</div>
`;
    const fullPanel = document.createElement("div");
    fullPanel.classList.add("ehvp-full-panel");
    fullPanel.innerHTML = HTML_STR;
    const close = () => {
      fullPanel.remove();
      onclose?.();
    };
    fullPanel.addEventListener("click", (event) => {
      if (event.target.classList.contains("ehvp-full-panel")) {
        close();
      }
    });
    root.appendChild(fullPanel);
    fullPanel.querySelector(".ehvp-custom-panel-close").addEventListener("click", close);
    const controlBarContainer = fullPanel.querySelector("#control-bar-example-container");
    let pickedKey = void 0;
    controlBarContainer.innerHTML = createControlBar();
    const initPickable = () => {
      Array.from(fullPanel.querySelectorAll(".s-pickable[data-key]")).forEach((element) => {
        element.addEventListener("click", () => {
          pickedKey = element.getAttribute("data-key") || void 0;
          btnCustomInput.value = "";
          if (pickedKey) btnCustomInput.focus();
        });
      });
    };
    initPickable();
    const btnCustomInput = fullPanel.querySelector("#b-main-btn-custom-input");
    const btnCustomConfirm = fullPanel.querySelector("#b-main-btn-custom-confirm");
    const btnCustomReset = fullPanel.querySelector("#b-main-btn-custom-reset");
    const confirm = () => {
      const value = btnCustomInput.value;
      btnCustomInput.value = "";
      if (!value || !pickedKey) return;
      conf.displayText[pickedKey] = value;
      saveConf(conf);
      controlBarContainer.innerHTML = createControlBar();
      initPickable();
    };
    btnCustomConfirm.addEventListener("click", confirm);
    btnCustomInput.addEventListener("keypress", (ev) => ev.key === "Enter" && confirm());
    btnCustomReset.addEventListener("click", () => {
      btnCustomInput.value = "";
      conf.displayText = {};
      saveConf(conf);
      controlBarContainer.innerHTML = createControlBar();
      initPickable();
    });
    for (let i = 0; i < 2; i++) {
      const btnCustomPreset = fullPanel.querySelector(`#b-main-btn-custom-preset${i + 1}`);
      btnCustomPreset.addEventListener("click", () => {
        conf.displayText = displayTextPreset(i);
        saveConf(conf);
        controlBarContainer.innerHTML = createControlBar();
        initPickable();
      });
    }
    const styleCustomInput = fullPanel.querySelector("#style-custom-input");
    const styleCustomConfirm = fullPanel.querySelector("#style-custom-confirm");
    styleCustomInput.addEventListener("keydown", (ev) => {
      if (ev.key === "Tab") {
        ev.preventDefault();
        const cursor = styleCustomInput.selectionStart;
        const left = styleCustomInput.value.slice(0, cursor);
        const right = styleCustomInput.value.slice(cursor);
        styleCustomInput.value = left + "  " + right;
        styleCustomInput.selectionStart = cursor + 2;
        styleCustomInput.selectionEnd = cursor + 2;
      }
    });
    const applyStyleCustom = (css) => {
      root.querySelector("#ehvp-style-custom")?.remove();
      const styleElement = document.createElement("style");
      styleElement.id = "ehvp-style-custom";
      conf.customStyle = css;
      styleElement.innerHTML = css;
      root.appendChild(styleElement);
      saveConf(conf);
    };
    styleCustomConfirm.addEventListener("click", () => applyStyleCustom(styleCustomInput.value));
    fullPanel.querySelectorAll(".ehvp-style-preset-btn").forEach((element) => {
      element.addEventListener("click", () => {
        const index = parseInt(element.getAttribute("data-index") ?? "0");
        const css = stylePreset(index);
        styleCustomInput.value = css;
        applyStyleCustom(css);
      });
    });
  }
  function stylePreset(index) {
    const list = [
      `.ehvp-root {
  --ehvp-theme-bg-color: #393939db;
  --ehvp-theme-font-color: #fff;
  --ehvp-thumbnail-list-bg: #000000;
  --ehvp-thumbnail-border-size: 2px;
  --ehvp-thumbnail-border-radius: 0px;
  --ehvp-thumbnail-box-shadow: none;
  --ehvp-img-fetched: #95ff97;
  --ehvp-img-failed: red;
  --ehvp-img-init: #ffffff;
  --ehvp-img-fetching: #00000000;
  --ehvp-controlbar-border: none;
  --ehvp-panel-border: none;
  --ehvp-panel-box-shadow: none;
  --ehvp-big-images-gap: 0px;
  --ehvp-big-images-bg: #000000c4;
  --ehvp-clickable-color-hover: #90ea90;
  --ehvp-playing-progress-bar-color: #ffffffd0;
  ${IS_MOBILE ? "" : "font-size: 16px;"}
  font-family: Poppins,sans-serif;
}
/** override any style here, make the big image have a green border */
/**
.bifm-container > div {
  border: 2px solid green;
}
*/`,
      `.ehvp-root {
  --ehvp-theme-bg-color: #ffffff;
  --ehvp-theme-font-color: #760098;
  --ehvp-thumbnail-list-bg: #ffffff;
  --ehvp-thumbnail-border-size: 2px;
  --ehvp-thumbnail-border-radius: 4px;
  --ehvp-thumbnail-box-shadow: 0px 2px 2px 0px #785174;
  --ehvp-img-fetched: #d96cff;
  --ehvp-img-failed: red;
  --ehvp-img-init: #000000;
  --ehvp-img-fetching: #ffffff70;
  --ehvp-controlbar-border: 2px solid #760098;
  --ehvp-panel-border: 2px solid #760098;
  --ehvp-panel-box-shadow: none;
  --ehvp-big-images-gap: 0px;
  --ehvp-big-images-bg: #919191b0;
  --ehvp-clickable-color-hover: #ff87ba;
  --ehvp-playing-progress-bar-color: #760098d0;
  ${IS_MOBILE ? "" : "font-size: 16px;"}
  font-family: Poppins, sans-serif;
}`,
      `.ehvp-root {
  --ehvp-theme-bg-color: #000000c9;
  --ehvp-theme-font-color: #ffe637;
  --ehvp-thumbnail-list-bg: #000000;
  --ehvp-thumbnail-border-size: 2px;
  --ehvp-thumbnail-border-radius: 0px;
  --ehvp-thumbnail-box-shadow: none;
  --ehvp-img-fetched: #ffe637;
  --ehvp-img-failed: red;
  --ehvp-img-init: #fff;
  --ehvp-img-fetching: #00000000;
  --ehvp-controlbar-border: 2px solid #ffe637;
  --ehvp-panel-border: 2px solid #ffe637;
  --ehvp-panel-box-shadow: none;
  --ehvp-big-images-gap: 0px;
  --ehvp-big-images-bg: #000000d6;
  --ehvp-clickable-color-hover: #90ea90;
  --ehvp-playing-progress-bar-color: #ffe637d0;
  ${IS_MOBILE ? "" : "font-size: 16px;"}
  font-family: Poppins, sans-serif;
}`,
      `.ehvp-root {
  --ehvp-theme-bg-color: #ffffff;
  --ehvp-theme-font-color: #000000;
  --ehvp-thumbnail-list-bg: #ffffff;
  --ehvp-thumbnail-border-size: 2px;
  --ehvp-thumbnail-border-radius: 4px;
  --ehvp-thumbnail-box-shadow: 0px 2px 2px 0px #000000;
  --ehvp-img-fetched: #000000;
  --ehvp-img-failed: red;
  --ehvp-img-init: #ffffff;
  --ehvp-img-fetching: #ffffff70;
  --ehvp-controlbar-border: 2px solid #000000;
  --ehvp-panel-border: 2px solid #000000;
  --ehvp-panel-box-shadow: none;
  --ehvp-big-images-gap: 0px;
  --ehvp-big-images-bg: #919191b0;
  --ehvp-clickable-color-hover: #ff0000;
  --ehvp-playing-progress-bar-color: #000000d0;
  ${IS_MOBILE ? "" : "font-size: 16px;"}
  font-family: Poppins, sans-serif;
}`
    ];
    return list[index] ?? "";
  }
  function displayTextPreset(index) {
    const list = [
      {
        entry: "ENTER",
        collapse: "X",
        config: "C",
        download: "D",
        chapters: "CH.",
        filter: "FL.",
        fin: "F",
        pagination: "P",
        continuous: "C",
        horizontal: "H",
        autoPagePlay: "PLAY",
        autoPagePause: "PAUSE"
      },
      {
        entry: "<✿>",
        collapse: ">✴<",
        config: "☸",
        download: "⬇",
        chapters: "CH.",
        filter: "⌕",
        fin: "⬇",
        pagination: "❏",
        continuous: "⇅",
        horizontal: "⇆",
        autoPagePlay: "⊳",
        autoPagePause: "⇢⇢⇢"
      }
    ];
    return list[index] ?? {};
  }

  function queryRule(root, selector) {
    return Array.from(root.cssRules).find((rule) => rule.selectorText === selector);
  }

  function createActionCustomPanel(root, onclose) {
    const HTML_STR = `
<div class="ehvp-custom-panel" style="min-width:30vw;">
  <div class="ehvp-custom-panel-title">
    <span>${i18n.showActionCustom.get()}</span>
    <span id="ehvp-custom-panel-close" class="ehvp-custom-panel-close">✖</span>
  </div>

  <div class="ehvp-custom-panel-container">

    <div class="ehvp-custom-panel-content">
      <div class="ehvp-custom-panel-item">
       <div class="ehvp-custom-panel-item-title">
         <span>${i18n.showActionCustom.get()}</span>
       </div>
       <div id="ehvp-image-action-values" class="ehvp-custom-panel-item-values">
         <!-- wait element created from button event -->
       </div>
      </div>
    </div>

    <div class="ehvp-custom-panel-content">
      <div class="ehvp-custom-panel-item">
        <div class="ehvp-custom-panel-item-title">
         <span>${i18n.example.get()}</span>
        </div>
        <div>
          <span class="ehvp-action-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="0">Example 1</span>
          <span class="ehvp-action-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="1">Example 2</span>
          <span class="ehvp-action-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="2">Example 3</span>
          <span class="ehvp-action-preset-btn ehvp-custom-btn ehvp-custom-btn-green" data-index="3">Example 4</span>
        </div>
      </div>
    </div>

    <div class="ehvp-custom-panel-content" style="position:relative;">
      <div><span style="font-size:1.6em;color:#888;">${i18n.description.get()}</span></div>
      <div>
        <div>
          <label>
            <span>${i18n.icon.get()}</span>
            <input id="ehvp-action-input-icon" style="width: 2em;" type="text">
          </label>
        </div>
        <div>
          <label>
            <span>${i18n.description.get()} (${i18n.optional.get()})</span>
            <input id="ehvp-action-input-desc" style="width: 98%;" type="text">
          </label>
        </div>
        <div>
          <label>
            <span>${i18n.workon.get()} (${i18n.optional.get()},${i18n.regexp.get()})</span>
            <input id="ehvp-action-input-workon" style="width: 98%;" type="text">
          </label>
        </div>
      </div>
      <div><span style="font-size:1.6em;color:#888;">${i18n.function.get()} ${i18n.parameters.get()}</span></div>
      <div>
        <a class="ehvp-custom-btn-green" target="_blank" href="https://github.com/MapoMagpie/eh-view-enhance/blob/9ec4f7970983501ca3c5d8165c455a2654b52bf6/src/img-fetcher.ts#L30">imf</a>
        <a class="ehvp-custom-btn-green" target="_blank" href="https://github.com/MapoMagpie/eh-view-enhance/blob/9ec4f7970983501ca3c5d8165c455a2654b52bf6/src/img-node.ts#L47">imn</a>
        <a class="ehvp-custom-btn-green" target="_blank" href="https://www.tampermonkey.net/documentation.php?locale=en#api:GM_xmlhttpRequest">gm_xhr</a>
        <a class="ehvp-custom-btn-green" target="_blank" href="https://github.com/MapoMagpie/eh-view-enhance/blob/9ec4f7970983501ca3c5d8165c455a2654b52bf6/src/event-bus.ts#L8">EBUS</a>
      </div>
      <div><span style="font-size:1.6em;color:#888;">${i18n.function.get()} ${i18n.body.get()}</span></div>
      <textarea id="ehvp-action-input-funcbody" style="min-width: 60vw; height: 50vh;border:none;background-color:#00000090;color:#97ff97;text-align:left;vertical-align:top;font-size:1.2em;font-weight:600;"></textarea>
      <span id="ehvp-action-add-confirm" style="position:absolute;bottom:2em;right:1em;" class="ehvp-custom-btn ehvp-custom-btn-green">&nbspAdd&nbsp</span>
    </div>

  </div>
</div>
`;
    const fullPanel = document.createElement("div");
    fullPanel.classList.add("ehvp-full-panel");
    fullPanel.innerHTML = HTML_STR;
    const close = () => {
      fullPanel.remove();
      onclose?.();
    };
    fullPanel.addEventListener("click", (event) => {
      if (event.target.classList.contains("ehvp-full-panel")) {
        close();
      }
    });
    root.appendChild(fullPanel);
    fullPanel.querySelector(".ehvp-custom-panel-close").addEventListener("click", close);
    const actionsContainer = fullPanel.querySelector("#ehvp-image-action-values");
    const iconInput = fullPanel.querySelector("#ehvp-action-input-icon");
    const descInput = fullPanel.querySelector("#ehvp-action-input-desc");
    const workonInput = fullPanel.querySelector("#ehvp-action-input-workon");
    const funcbodyInput = fullPanel.querySelector("#ehvp-action-input-funcbody");
    const actionCustomComfirm = fullPanel.querySelector("#ehvp-action-add-confirm");
    function createActionValues() {
      actionsContainer.innerHTML = "";
      const tamplate = document.createElement("div");
      conf.imgNodeActions.map((action) => {
        const str = `<span class="ehvp-custom-panel-item-value"><span class="ehvp-span-action-icon">${action.icon}</span><span class="ehvp-custom-btn ehvp-custom-btn-plain" style="padding:0;border:none;">&nbspx&nbsp</span></span>`;
        tamplate.innerHTML = str;
        const element = tamplate.firstElementChild;
        actionsContainer.append(element);
        element.querySelector(".ehvp-custom-btn").addEventListener("click", () => {
          const index = conf.imgNodeActions.findIndex((a) => a.icon === action.icon && a.funcBody === action.funcBody);
          if (index === -1) return;
          setActionValue(action);
          conf.imgNodeActions.splice(index, 1);
          saveConf(conf);
          createActionValues();
        });
        element.querySelector(".ehvp-span-action-icon").addEventListener("click", () => setActionValue(action));
      });
      tamplate.remove();
    }
    createActionValues();
    function addActionCustom() {
      const icon = iconInput.value;
      const desc = descInput.value;
      const workon = workonInput.value;
      const funcBody = funcbodyInput.value;
      if (!icon) {
        confirm("icon cannot be empty!");
        return;
      }
      if (!funcBody) {
        confirm("func body cannot be empty!");
        return;
      }
      try {
        const AsyncFunction = async function() {
        }.constructor;
        AsyncFunction("imf", "imn", "gm_xhr", "EBUS", funcBody);
      } catch (err) {
        confirm("cannot create function (this site limit), " + err);
        return;
      }
      if (workon) {
        try {
          new RegExp(workon);
        } catch (err) {
          confirm("invalid regexp: " + err);
          return;
        }
      }
      conf.imgNodeActions.push({ icon, description: desc, workon, funcBody });
      saveConf(conf);
      createActionValues();
      fullPanel.querySelector(".ehvp-custom-panel-container")?.scrollTo({ top: 0 });
    }
    function setActionValue(action) {
      iconInput.value = action.icon;
      descInput.value = action.description;
      workonInput.value = action.workon ?? "";
      funcbodyInput.value = action.funcBody;
    }
    fullPanel.querySelectorAll(".ehvp-action-preset-btn").forEach((element) => {
      element.addEventListener("click", () => {
        const index = parseInt(element.getAttribute("data-index") ?? "0");
        const action = actionExample(index);
        if (!action) return;
        setActionValue(action);
      });
    });
    funcbodyInput.addEventListener("keydown", (ev) => {
      if (ev.key === "Tab") {
        ev.preventDefault();
        const cursor = funcbodyInput.selectionStart;
        const left = funcbodyInput.value.slice(0, cursor);
        const right = funcbodyInput.value.slice(cursor);
        funcbodyInput.value = left + "  " + right;
        funcbodyInput.selectionStart = cursor + 2;
        funcbodyInput.selectionEnd = cursor + 2;
      }
    });
    actionCustomComfirm.addEventListener("click", () => addActionCustom());
  }
  function actionExample(index) {
    const list = [
      {
        icon: "S",
        description: "Upload this image to local (miniserve --port 14001 --upload-files . .)",
        workon: `e[-x]hentai.org|x.com|pixiv.com`,
        funcBody: `
if (imf.stage === 3 && imf.data) {
  const formData = new FormData();
  formData.append("file", new Blob([imf.data]), imn.title);
  formData.append("path", "/");
  const p = new Promise((resolve, reject) => {
    gm_xhr({
      url: "http://localhost:14001/upload?path=/",
      method: "POST",
      timeout: 10 * 1000,
      data: formData,
      onload: () => resolve(true),
      onabort: () => reject("abort"),
      onerror: (ev) => reject(ev.error),
      ontimeout: () => reject("timeout"),
    });
  });
  await p;
}
  `
      },
      {
        icon: "换",
        description: "Download and Replace this image",
        workon: ".*",
        funcBody: `
const p = new Promise((resolve, reject) => {
  gm_xhr({
    url: "https://media.senscritique.com/media/000022161329/0/les_miserables_shoujo_cosette.jpg",
    method: "GET",
    responseType: "blob",
    timeout: 10 * 1000,
    onload: (ev) => resolve(ev.response),
    onabort: () => reject("abort"),
    onerror: (ev) => reject(ev.error),
    ontimeout: () => reject("timeout"),
  });
});
const data = await p;
return {data};
  `
      },
      {
        icon: "✔",
        description: "Cherry pick this image",
        funcBody: `EBUS.emit("add-cherry-pick-range", imf.chapterIndex, imf.index, true, false);`
      },
      {
        icon: "✖",
        description: "Cherry pick but exclude this image",
        funcBody: `EBUS.emit("add-cherry-pick-range", imf.chapterIndex, imf.index, false, false);`
      }
    ];
    return list[index];
  }

  class KeyboardDesc {
    defaultKeys;
    cb;
    noPreventDefault = false;
    constructor(defaultKeys, cb, noPreventDefault) {
      this.defaultKeys = defaultKeys;
      this.cb = cb;
      this.noPreventDefault = noPreventDefault || false;
    }
  }
  function initEvents(HTML, BIFM, IFQ, IL, PH) {
    function modNumberConfigEvent(key, data, value) {
      if (!value) {
        const range = {
          colCount: [1, 12],
          rowHeight: [50, 4096],
          threads: [1, 10],
          downloadThreads: [1, 10],
          timeout: [8, 40],
          autoPageSpeed: [1, 100],
          preventScrollPageTime: [-1, 9e4],
          paginationIMGCount: [1, 3],
          scrollingDelta: [1, 5e3],
          scrollingSpeed: [1, 100]
        };
        let mod = 1;
        if (key === "preventScrollPageTime" || key === "rowHeight" || key === "scrollingDelta") {
          mod = conf[key] === 1 ? 9 : 10;
        }
        if (data === "add") {
          value = Math.min(conf[key] + mod, range[key][1]);
        } else if (data === "minus") {
          value = Math.max(conf[key] - mod, range[key][0]);
        }
      }
      if (value === void 0) return;
      conf[key] = value;
      const inputElement = q(`#${key}Input`, HTML.config.panel);
      inputElement.value = conf[key].toString();
      if (key === "colCount" || key === "rowHeight") {
        EBUS.emit("fvg-flow-vision-resize");
      }
      if (key === "paginationIMGCount") {
        q("#paginationInput", HTML.paginationAdjustBar).textContent = conf.paginationIMGCount.toString();
        const imgRule = queryRule(HTML.styleSheet, ".bifm-container-page .bifm-img");
        if (imgRule) {
          imgRule.style.maxWidth = conf.imgScale === 100 && conf.paginationIMGCount === 1 ? "100%" : "";
        }
        BIFM.setNow(IFQ[IFQ.currIndex]);
      }
      saveConf(conf);
    }
    function modBooleanConfigEvent(key, value) {
      const inputElement = q(`#${key}Checkbox`, HTML.config.panel);
      if (value !== void 0) {
        inputElement.checked = value;
      } else {
        value = inputElement.checked || false;
      }
      if (value === void 0) return;
      conf[key] = value;
      saveConf(conf);
      if (key === "autoLoad") {
        IL.autoLoad = conf.autoLoad;
        IL.abort(0, conf.restartIdleLoader / 3);
      }
      if (key === "reversePages") {
        BIFM.changeLayout();
      }
    }
    function changeReadModeEvent(value) {
      if (value) {
        conf.readMode = value;
      }
      BIFM.changeLayout();
      conf.autoPageSpeed = conf.readMode === "pagination" ? 5 : 1;
      saveConf(conf);
      q("#autoPageSpeedInput", HTML.config.panel).value = conf.autoPageSpeed.toString();
      Array.from(HTML.readModeSelect.querySelectorAll(".b-main-option")).forEach((element) => {
        if (element.getAttribute("data-value") === conf.readMode) {
          element.classList.add("b-main-option-selected");
        } else {
          element.classList.remove("b-main-option-selected");
        }
      });
      if (conf.readMode === "pagination") {
        HTML.root.querySelectorAll(".img-land").forEach((element) => element.style.display = "");
      } else {
        HTML.root.querySelectorAll(".img-land").forEach((element) => element.style.display = "none");
      }
    }
    function modSelectConfigEvent(key, value) {
      const inputElement = q(`#${key}Select`, HTML.config.panel);
      if (value) {
        inputElement.value = value;
      } else {
        value = inputElement.value;
      }
      if (!value) return;
      conf[key] = value;
      saveConf(conf);
      if (key === "readMode") {
        changeReadModeEvent();
      }
      if (key === "minifyPageHelper") {
        switch (conf.minifyPageHelper) {
          case "always":
            PH.minify("bigImageFrame");
            break;
          case "inBigMode":
          case "never":
            PH.minify(BIFM.visible ? "bigImageFrame" : "fullViewGrid");
            break;
        }
      }
    }
    const cancelIDContext = {};
    function collapsePanelEvent(target, id) {
      if (id) {
        abortMouseleavePanelEvent(id);
      }
      const timeoutId = window.setTimeout(() => target.classList.add("p-collapse"), 100);
      if (id) {
        cancelIDContext[id] = timeoutId;
      }
    }
    function abortMouseleavePanelEvent(id) {
      (id ? [id] : [...Object.keys(cancelIDContext)]).forEach((k) => {
        window.clearTimeout(cancelIDContext[k]);
        delete cancelIDContext[k];
      });
    }
    function togglePanelEvent(idPrefix, collapse, target) {
      const id = `${idPrefix}-panel`;
      const element = q("#" + id, HTML.pageHelper);
      if (!element) return;
      if (collapse === void 0) {
        togglePanelEvent(idPrefix, !element.classList.contains("p-collapse"), target);
        return;
      }
      if (collapse) {
        collapsePanelEvent(element, id);
      } else {
        Array.from(HTML.root.querySelectorAll(".p-panel")).filter((ele) => ele !== element).forEach((ele) => collapsePanelEvent(ele, ele.id));
        element.classList.remove("p-collapse");
        if (target) {
          relocateElement(element, target, HTML.root.clientWidth, HTML.root.clientHeight);
        }
      }
    }
    const bodyOverflow = document.body.style.overflow;
    function showFullViewGrid() {
      HTML.root.classList.remove("ehvp-root-collapse");
      if (BIFM.visible) {
        BIFM.root.focus();
        PH.minify("bigImageFrame");
      } else {
        HTML.fullViewGrid.focus();
        PH.minify("fullViewGrid");
      }
      document.body.style.overflow = "hidden";
    }
    function hiddenFullViewGrid() {
      PH.minify("exit");
      HTML.entryBTN.setAttribute("data-stage", "exit");
      HTML.root.classList.add("ehvp-root-collapse");
      if (BIFM.visible) {
        BIFM.root.blur();
      } else {
        HTML.fullViewGrid.blur();
      }
      document.body.style.overflow = bodyOverflow;
    }
    function initKeyboardEvent() {
      const inBigImageMode = {
        "exit-big-image-mode": new KeyboardDesc(
          ["escape", "enter"],
          () => BIFM.hidden()
        ),
        "step-image-prev": new KeyboardDesc(
          ["arrowleft"],
          () => {
            BIFM.callbackOnWheel?.();
            BIFM.stepNext(conf.reversePages ? "next" : "prev");
          }
        ),
        "step-image-next": new KeyboardDesc(
          ["arrowright"],
          () => {
            BIFM.callbackOnWheel?.();
            BIFM.stepNext(conf.reversePages ? "prev" : "next");
          }
        ),
        "step-to-first-image": new KeyboardDesc(
          ["home"],
          () => BIFM.stepNext("next", 0, 1)
        ),
        "step-to-last-image": new KeyboardDesc(
          ["end"],
          () => BIFM.stepNext("prev", 0, -1)
        ),
        "scale-image-increase": new KeyboardDesc(
          ["="],
          () => BIFM.scaleBigImages(1, 5)
        ),
        "scale-image-decrease": new KeyboardDesc(
          ["-"],
          () => BIFM.scaleBigImages(-1, 5)
        ),
        "scroll-image-up": new KeyboardDesc(
          ["pageup", "arrowup", "shift+space"],
          (event) => {
            const key = parseKey(event);
            const noPrevent = ["pageup", "shift+space"].includes(key);
            let customKey = !["pageup", "arrowup", "shift+space"].includes(key);
            BIFM.onWheel(new WheelEvent("wheel", { deltaY: conf.scrollingDelta * -1 }), noPrevent, customKey, void 0, event);
          },
          true
        ),
        "scroll-image-down": new KeyboardDesc(
          ["pagedown", "arrowdown", "space"],
          (event) => {
            const key = parseKey(event);
            const noPrevent = ["pagedown", "space"].includes(key);
            const customKey = !["pagedown", "arrowdown", "space"].includes(key);
            BIFM.onWheel(new WheelEvent("wheel", { deltaY: conf.scrollingDelta }), noPrevent, customKey, void 0, event);
          },
          true
        ),
        "toggle-auto-play": new KeyboardDesc(
          ["p"],
          () => EBUS.emit("toggle-auto-play")
        ),
        "round-read-mode": new KeyboardDesc(
          ["alt+m"],
          () => {
            const readModeList = ["pagination", "continuous", "horizontal"];
            const index = (readModeList.indexOf(conf.readMode) + 1) % readModeList.length;
            modSelectConfigEvent("readMode", readModeList[index]);
          },
          true
        ),
        "toggle-reverse-pages": new KeyboardDesc(
          ["alt+f"],
          () => modBooleanConfigEvent("reversePages", !conf.reversePages),
          true
        ),
        "rotate-image": new KeyboardDesc(
          ["alt+r"],
          () => EBUS.emit("bifm-rotate-image"),
          true
        ),
        "cherry-pick-current": new KeyboardDesc(
          ["alt+x"],
          () => BIFM.cherryPickCurrent(false),
          true
        ),
        "exclude-current": new KeyboardDesc(
          ["shift+alt+x"],
          () => BIFM.cherryPickCurrent(true),
          true
        ),
        "go-prev-chapter": new KeyboardDesc(
          ["shift+alt+w"],
          () => EBUS.emit("pf-step-chapters", "prev"),
          true
        ),
        "go-next-chapter": new KeyboardDesc(
          ["alt+w"],
          () => EBUS.emit("pf-step-chapters", "next"),
          true
        )
      };
      const inFullViewGrid = {
        "open-big-image-mode": new KeyboardDesc(
          ["enter"],
          () => {
            let start = IFQ.currIndex;
            if (numberRecord && numberRecord.length > 0) {
              start = Number(numberRecord.join("")) - 1;
              numberRecord = null;
              if (isNaN(start)) return;
              start = Math.max(0, Math.min(start, IFQ.length - 1));
            }
            IFQ[start].node.root?.querySelector("a")?.dispatchEvent(new MouseEvent("click", { bubbles: false, cancelable: true }));
          }
        ),
        "pause-auto-load-temporarily": new KeyboardDesc(
          ["alt+p"],
          () => {
            IL.autoLoad = !IL.autoLoad;
            if (IL.autoLoad) {
              IL.abort(IFQ.currIndex, conf.restartIdleLoader / 3);
              EBUS.emit("notify-message", "info", "Auto load Restarted", 3 * 1e3);
            } else {
              EBUS.emit("notify-message", "info", "Auto load Pause", 3 * 1e3);
            }
          }
        ),
        "exit-full-view-grid": new KeyboardDesc(
          ["escape"],
          () => EBUS.emit("toggle-main-view", false)
        ),
        "columns-increase": new KeyboardDesc(
          ["="],
          () => modNumberConfigEvent("colCount", "add")
        ),
        "columns-decrease": new KeyboardDesc(
          ["-"],
          () => modNumberConfigEvent("colCount", "minus")
        ),
        "toggle-auto-play": new KeyboardDesc(
          ["p"],
          () => EBUS.emit("toggle-auto-play")
        ),
        "retry-fetch-next-page": new KeyboardDesc(
          ["alt+n"],
          () => EBUS.emit("pf-retry-extend")
        ),
        "resize-flow-vision": new KeyboardDesc(
          ["alt+r"],
          () => EBUS.emit("fvg-flow-vision-resize")
        ),
        "start-download": new KeyboardDesc(
          ["shift+alt+d"],
          () => EBUS.emit("start-download", () => PH.minify("fullViewGrid", false))
        ),
        "go-prev-chapter": new KeyboardDesc(
          ["shift+alt+w"],
          () => EBUS.emit("pf-step-chapters", "prev"),
          true
        ),
        "go-next-chapter": new KeyboardDesc(
          ["alt+w"],
          () => EBUS.emit("pf-step-chapters", "next"),
          true
        )
      };
      const inMain = {
        "open-full-view-grid": new KeyboardDesc(["enter"], () => {
          const activeElement = document.activeElement;
          if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement || activeElement instanceof HTMLSelectElement) return;
          EBUS.emit("toggle-main-view", true);
        }, true),
        "start-download": new KeyboardDesc(["shift+alt+d"], () => {
          EBUS.emit("start-download", () => PH.minify("exit", false));
        }, true)
      };
      return { inBigImageMode, inFullViewGrid, inMain };
    }
    const keyboardEvents = initKeyboardEvent();
    let numberRecord = null;
    function bigImageFrameKeyBoardEvent(event) {
      if (HTML.bigImageFrame.classList.contains("big-img-frame-collapse")) return;
      const key = parseKey(event);
      const found = Object.entries(keyboardEvents.inBigImageMode).find(([id, desc2]) => {
        const override = conf.keyboards.inBigImageMode[id];
        return override !== void 0 && override.length > 0 ? override.includes(key) : desc2.defaultKeys.includes(key);
      });
      if (!found) return;
      const [_, desc] = found;
      if (!desc.noPreventDefault) event.preventDefault();
      desc.cb(event);
    }
    function fullViewGridKeyBoardEvent(event) {
      if (HTML.root.classList.contains("ehvp-root-collapse")) return;
      const key = parseKey(event);
      const found = Object.entries(keyboardEvents.inFullViewGrid).find(([id, desc]) => {
        const override = conf.keyboards.inFullViewGrid[id];
        return override !== void 0 && override.length > 0 ? override.includes(key) : desc.defaultKeys.includes(key);
      });
      if (found) {
        const [_, desc] = found;
        if (!desc.noPreventDefault) event.preventDefault();
        desc.cb(event);
      } else if (event instanceof KeyboardEvent && event.key.length === 1 && event.key >= "0" && event.key <= "9") {
        numberRecord = numberRecord ? [...numberRecord, Number(event.key)] : [Number(event.key)];
        event.preventDefault();
      }
    }
    function keyboardEvent(event) {
      if (!HTML.root.classList.contains("ehvp-root-collapse")) return;
      if (!HTML.bigImageFrame.classList.contains("big-img-frame-collapse")) return;
      const key = parseKey(event);
      const found = Object.entries(keyboardEvents.inMain).find(([id, desc2]) => {
        const override = conf.keyboards.inMain[id];
        return override !== void 0 && override.length > 0 ? override.includes(key) : desc2.defaultKeys.includes(key);
      });
      if (!found) return;
      const [_, desc] = found;
      if (!desc.noPreventDefault) event.preventDefault();
      desc.cb(event);
    }
    function focus() {
      BIFM.visible ? HTML.bigImageFrame.focus() : HTML.fullViewGrid.focus();
    }
    function showGuideEvent() {
      createHelpPanel(HTML.root, focus);
    }
    function showKeyboardCustomEvent() {
      createKeyboardCustomPanel(keyboardEvents, HTML.root, focus);
    }
    function showSiteProfilesEvent() {
      createSiteProfilePanel(HTML.root, focus);
    }
    function showStyleCustomEvent() {
      createStyleCustomPanel(HTML.root, focus);
    }
    function showActionCustomEvent() {
      createActionCustomPanel(HTML.root, focus);
    }
    return {
      modNumberConfigEvent,
      modBooleanConfigEvent,
      modSelectConfigEvent,
      togglePanelEvent,
      showFullViewGrid,
      hiddenFullViewGrid,
      fullViewGridKeyBoardEvent,
      bigImageFrameKeyBoardEvent,
      keyboardEvent,
      showGuideEvent,
      collapsePanelEvent,
      abortMouseleavePanelEvent,
      showKeyboardCustomEvent,
      showSiteProfilesEvent,
      showStyleCustomEvent,
      showActionCustomEvent,
      changeReadModeEvent
    };
  }

  class Layout {
  }
  class FullViewGridManager {
    root;
    queue = [];
    done = false;
    chapterIndex = 0;
    layout;
    resizedNodesPending = [];
    debouncer;
    constructor(HTML, BIFM, flowVision = false) {
      this.root = HTML.fullViewGrid;
      this.debouncer = new Debouncer();
      if (flowVision) {
        this.layout = new FlowVisionLayout(this.root);
      } else {
        this.layout = new GRIDLayout(this.root, HTML.styleSheet);
      }
      EBUS.subscribe("pf-on-appended", (_total, nodes, chapterIndex, done) => {
        if (this.chapterIndex > -1 && chapterIndex !== this.chapterIndex) return;
        this.append(nodes);
        this.done = done || false;
        setTimeout(() => this.renderCurrView(), 200);
      });
      EBUS.subscribe("pf-change-chapter", (index) => {
        this.chapterIndex = index;
        this.layout.reset();
        this.queue = [];
        this.done = false;
      });
      EBUS.subscribe("ifq-do", (_, imf) => {
        if (!BIFM.visible) return;
        if (imf.chapterIndex !== this.chapterIndex) return;
        if (!imf.node.root) return;
        let scrollTo = 0;
        if (flowVision) {
          scrollTo = imf.node.root.parentElement.offsetTop - window.screen.availHeight / 3;
        } else {
          scrollTo = imf.node.root.offsetTop - window.screen.availHeight / 3;
        }
        scrollTo = scrollTo <= 0 ? 0 : scrollTo >= this.root.scrollHeight ? this.root.scrollHeight : scrollTo;
        if (this.root.scrollTo.toString().includes("[native code]")) {
          this.root.scrollTo({ top: scrollTo, behavior: "smooth" });
        } else {
          this.root.scrollTop = scrollTo;
        }
      });
      EBUS.subscribe("cherry-pick-changed", (chapterIndex) => this.chapterIndex === chapterIndex && this.updateRender());
      this.root.addEventListener("scroll", () => this.debouncer.addEvent("FULL-VIEW-SCROLL-EVENT", () => {
        if (HTML.root.classList.contains("ehvp-root-collapse")) return;
        this.renderCurrView();
        this.tryExtend();
      }, 400));
      this.root.addEventListener("click", (event) => {
        if (event.target === HTML.fullViewGrid || event.target.classList.contains("fvg-sub-container")) {
          EBUS.emit("toggle-main-view", false);
        }
      });
      EBUS.subscribe("fvg-flow-vision-resize", () => this.layout.resize(this.queue));
      EBUS.subscribe("imf-resize", (imf) => this.resizedNodes(imf));
    }
    resizedNodes(imf) {
      const node = imf.node;
      if (node.root) {
        this.resizedNodesPending.push(node.root);
      }
      this.debouncer.addEvent("RESIZED-NODES", () => {
        if (this.resizedNodesPending.length === 0) return;
        let node2 = null;
        while (node2 = this.resizedNodesPending.shift()) {
          const remove = this.layout.resizedNode(node2, this.resizedNodesPending);
          this.resizedNodesPending = this.resizedNodesPending.filter((_, i) => !remove.includes(i));
        }
      }, 50);
    }
    append(nodes) {
      if (nodes.length > 0) {
        let index = this.queue.length;
        const list = nodes.map((n) => {
          const ret = { node: n, element: n.create(), ratio: n.ratio() };
          ret.element.setAttribute("data-index", index.toString());
          index++;
          return ret;
        });
        this.queue.push(...list);
        this.layout.append(list);
      }
    }
    tryExtend() {
      if (this.done) return;
      if (this.layout.nearBottom()) EBUS.emit("pf-try-extend");
    }
    updateRender() {
      this.queue.forEach(({ node }) => node.isRender() && node.render());
    }
    renderCurrView() {
      const [se, ee] = this.layout.visibleRange(this.root, this.queue.map((e) => e.element));
      const [start, end] = [parseInt(se.getAttribute("data-index") ?? "-1"), parseInt(ee.getAttribute("data-index") ?? "-1")];
      if (start < end && start > -1 && end < this.queue.length) {
        this.queue.slice(start, end + 1).forEach((e) => e.node.render());
        evLog("info", "render curr view, range: ", `[${start}-${end}]`);
      } else {
        evLog("error", "render curr view error, range: ", `[${start}-${end}]`);
      }
    }
  }
  class GRIDLayout extends Layout {
    root;
    style;
    constructor(root, style) {
      super();
      this.root = root;
      this.style = style;
      this.root.classList.add("fvg-grid");
      this.root.classList.remove("fvg-flow");
    }
    append(nodes) {
      this.root.append(...nodes.map((l) => l.element));
    }
    nearBottom() {
      const nodes = Array.from(this.root.childNodes);
      if (nodes.length === 0) return false;
      const lastImgNode = nodes[nodes.length - 1];
      const viewButtom = this.root.scrollTop + this.root.clientHeight;
      if (viewButtom + this.root.clientHeight * 2.5 < lastImgNode.offsetTop + lastImgNode.offsetHeight) {
        return false;
      }
      return true;
    }
    reset() {
      this.root.innerHTML = "";
    }
    resize() {
      const rule = queryRule(this.style, ".fvg-grid");
      if (rule) rule.style.gridTemplateColumns = `repeat(${conf.colCount}, minmax(10px, 1fr))`;
    }
    resizedNode(_node, pending) {
      return pending.map((_, i) => i);
    }
    visibleRange(container, children) {
      if (children.length === 0) return [container, container];
      const vh = container.offsetHeight;
      let first;
      let last;
      let overRow = 0;
      for (let i = 0; i < children.length; i += conf.colCount) {
        const rect = children[i].getBoundingClientRect();
        const visible = rect.top + rect.height >= 0 && rect.top <= vh;
        if (visible) {
          if (first === void 0) {
            first = children[i];
          }
        }
        if (first && !visible) {
          overRow++;
        }
        if (overRow >= 2) {
          last = children[Math.min(children.length - 1, i + conf.colCount)];
          break;
        }
      }
      last = last ?? children[children.length - 1];
      return [first ?? last, last];
    }
  }
  class FlowVisionLayout extends Layout {
    root;
    lastRow;
    count = 0;
    resizeObserver;
    lastRootWidth;
    // baseline
    base;
    constructor(root) {
      super();
      this.root = root;
      this.root.classList.add("fvg-flow");
      this.root.classList.remove("fvg-grid");
      this.lastRootWidth = this.root.offsetWidth;
      this.base = this.initBaseline();
      this.resizeObserver = new ResizeObserver((entries) => {
        const root2 = entries[0];
        const width = root2.contentRect.width;
        if (this.lastRootWidth !== width) {
          this.lastRootWidth = width;
          Array.from(root2.target.querySelectorAll(".fvg-sub-container")).forEach((row) => this.resizeRow(row));
        }
      });
      this.resizeObserver.observe(this.root);
    }
    initBaseline() {
      return { height: conf.rowHeight, columns: conf.colCount, gap: 8 };
    }
    createRow(lastRowHeight) {
      const container = document.createElement("div");
      container.classList.add("fvg-sub-container");
      container.style.height = (lastRowHeight ?? this.base.height) + "px";
      container.style.marginTop = this.base.gap + "px";
      this.root.appendChild(container);
      return container;
    }
    append(nodes) {
      for (const node of nodes) {
        node.element.style.marginLeft = this.base.gap + "px";
        if (!this.lastRow) this.lastRow = this.createRow();
        if (this.checkRowFilled(this.lastRow, node.ratio)) {
          this.resizeRow(this.lastRow);
          this.lastRow = this.createRow(this.lastRow?.offsetHeight);
        }
        this.lastRow.appendChild(node.element);
        this.count++;
      }
    }
    checkRowFilled(row, newNodeRatio) {
      if (row.childElementCount === 0) return false;
      let filled = row.childElementCount >= this.base.columns;
      if (!filled) {
        let nodeWidth = this.base.height * newNodeRatio;
        const allGap = row.childElementCount * this.base.gap + this.base.gap;
        const factor = 0.4 / Math.max(1, newNodeRatio);
        nodeWidth = nodeWidth * factor;
        const childrenWidth = this.childrenRatio(row).reduce((width, curr) => width + curr * this.base.height, 0);
        filled = childrenWidth + allGap + nodeWidth >= this.root.offsetWidth;
      }
      return filled;
    }
    childrenRatio(row) {
      const ret = [];
      const ratio = (c) => {
        let ratio2 = parseFloat(c.getAttribute("data-ratio") ?? "1");
        ratio2 = isNaN(ratio2) ? 1 : ratio2;
        return ratio2;
      };
      row.childNodes.forEach((c) => ret.push(ratio(c)));
      return ret;
    }
    resizeRow(row) {
      const ratio = this.childrenRatio(row).reduce((sum, cur) => sum + cur, 0);
      const allGap = row.childElementCount * this.base.gap + this.base.gap;
      const vw = this.root.offsetWidth;
      const rowHeight = (vw - allGap) / ratio;
      row.style.height = rowHeight + "px";
    }
    resize(allNodes) {
      this.base = this.initBaseline();
      this.root.innerHTML = "";
      this.lastRow = void 0;
      this.append(allNodes);
    }
    resizedNode(node, pending) {
      let row = node.parentElement;
      if (!row) return [];
      const fragment = document.createDocumentFragment();
      let children = [];
      function* next() {
        fragment.append(...children);
        if (row.childElementCount > 0) {
          const newChildren = Array.from(row.childNodes).map((child2) => child2);
          fragment.append(...newChildren);
          children.push(...newChildren);
        }
        let child = null;
        while (child = children.shift()) {
          yield child;
        }
        const nextRow = row?.nextElementSibling;
        if (nextRow) {
          children = Array.from(nextRow.childNodes).map((child2) => child2);
          while (child = children.shift()) {
            yield child;
          }
        }
      }
      let remove = [];
      let movedImgNode = 0, changedRows = 1;
      while (true) {
        for (const child of next()) {
          const ratio = parseFloat(child.getAttribute("data-ratio") ?? "1");
          if (this.checkRowFilled(row, ratio)) {
            children.unshift(child);
            this.resizeRow(row);
            break;
          }
          const index = pending.indexOf(child);
          if (index >= 0) remove.push(index);
          movedImgNode++;
          row.appendChild(child);
        }
        row = row?.nextElementSibling;
        if (row === null) {
          row = this.createRow();
        }
        if (children.length === 0) {
          if (row.childElementCount === 0) row.remove();
          break;
        }
        if (children.length === row.childElementCount && children[0] === row.firstElementChild) {
          break;
        }
        changedRows++;
      }
      evLog("info", `resizedNode moved img-nodes [${movedImgNode}], changed rows [${changedRows}], resized [${remove.length}]`);
      return remove;
    }
    nearBottom() {
      const last = this.lastRow;
      if (!last) return false;
      const viewButtom = this.root.scrollTop + this.root.clientHeight;
      if (viewButtom + this.root.clientHeight * 2.5 < last.offsetTop + last.offsetHeight) {
        return false;
      }
      return true;
    }
    reset() {
      this.lastRow = void 0;
      this.root.innerHTML = "";
    }
    visibleRange() {
      const children = Array.from(this.root.querySelectorAll(".fvg-sub-container"));
      if (children.length === 0) return [this.root, this.root];
      const vh = this.root.offsetHeight;
      let first;
      let last;
      let overRow = 0;
      for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect();
        const visible = rect.top + rect.height >= 0 && rect.top <= vh;
        if (visible) {
          if (first === void 0) {
            first = children[i].firstElementChild;
          }
        }
        if (first && !visible) {
          overRow++;
        }
        if (overRow >= 2) {
          last = children[i].lastElementChild;
          break;
        }
      }
      last = last ?? children[children.length - 1].lastElementChild;
      return [first ?? last, last];
    }
  }

  function toPositions(vw, vh, mouseX, mouseY) {
    const pos = { vw, vh };
    if (mouseX <= vw / 2) {
      pos.left = Math.max(mouseX, 5);
    } else {
      pos.right = Math.max(vw - mouseX, 5);
    }
    if (mouseY <= vh / 2) {
      pos.top = Math.max(mouseY, 5);
    } else {
      pos.bottom = Math.max(vh - mouseY, 5);
    }
    return pos;
  }
  function dragElement(element, callbacks, dragHub) {
    (dragHub ?? element).addEventListener("mousedown", (event) => {
      event.preventDefault();
      const wh = window.innerHeight;
      const ww = window.innerWidth;
      const abort = new AbortController();
      callbacks.onStart?.(event.clientX, event.clientY);
      document.addEventListener("mousemove", (event2) => {
        callbacks.onMoving?.(toPositions(ww, wh, event2.clientX, event2.clientY));
      }, { signal: abort.signal });
      document.addEventListener("mouseup", () => {
        abort.abort();
        callbacks.onFinish?.(toPositions(ww, wh, event.clientX, event.clientY));
      }, { once: true });
    });
  }
  function dragElementWithLine(event, element, lock, callback) {
    if (event.buttons !== 1) return;
    document.querySelector("#drag-element-with-line")?.remove();
    const canvas = document.createElement("canvas");
    canvas.id = "drag-element-with-line";
    canvas.style.position = "fixed";
    canvas.style.zIndex = "100000";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const rect = element.getBoundingClientRect();
    const height = Math.floor(rect.height / 2.2);
    const [startX, startY] = [rect.left + rect.width / 2, rect.top + rect.height / 2];
    const ctx = canvas.getContext("2d", { alpha: true });
    const abort = new AbortController();
    canvas.addEventListener("mouseup", () => {
      document.body.removeChild(canvas);
      abort.abort();
    }, { once: true });
    canvas.addEventListener("mousemove", (evt) => {
      const [endX, endY] = [
        lock.x ? startX : evt.clientX,
        startY 
      ];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = "#ffffffa0";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(endX, endY, height, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffffffa0";
      ctx.fill();
      callback(toMouseMoveData(startX, startY, endX, endY));
    }, { signal: abort.signal });
  }
  function toMouseMoveData(startX, startY, endX, endY) {
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const direction = 1 << (startY > endY ? 3 : 2) | 1 << (startX > endX ? 1 : 0);
    return { start: { x: startX, y: startY }, end: { x: endX, y: endY }, distance, direction };
  }

  function styleCSS() {
    const css = `
.ehvp-root {
  --ehvp-theme-bg-color: #333343bb;
  --ehvp-theme-font-color: #fff;
  --ehvp-thumbnail-list-bg: #000;
  --ehvp-thumbnail-border-size: 2px;
  --ehvp-thumbnail-border-radius: 5px;
  --ehvp-thumbnail-box-shadow: none;
  --ehvp-img-fetched: #90ffae;
  --ehvp-img-failed: red;
  --ehvp-img-init: #fff;
  --ehvp-img-fetching: #ffffff70;
  --ehvp-controlbar-border: 1px solid #2f7b10;
  --ehvp-panel-border: none;
  --ehvp-panel-box-shadow: none;
  --ehvp-big-images-gap: 0px;
  --ehvp-big-images-bg: #000000d6;
  --ehvp-clickable-color-hover: #90ea90;
  --ehvp-playing-progress-bar-color: #ffffffd0;
  font-size: 16px;
  font-family: Poppins,sans-serif;
}
.ehvp-root {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2000;
  box-sizing: border-box;
  overflow: clip;
}
.ehvp-root input[type="checkbox"] {
  width: 1em;
  height: unset !important;
}
.ehvp-root select {
  width: 8em;
  height: 2em;
}
.ehvp-root input {
  width: 3em;
  height: 1.5em;
}
.ehvp-root-collapse {
  height: 0;
}
.fvg-flow {
  width: 100%;
  height: 100%;
  overflow: hidden scroll;
  background: var(--ehvp-thumbnail-list-bg);
}
.fvg-grid {
  width: 100%;
  height: 100%;
  display: grid;
  align-content: start;
  grid-gap: 0.7em;
  grid-template-columns: repeat(${conf.colCount}, minmax(10px, 1fr));
  overflow: hidden scroll;
  padding: 0.3em;
  box-sizing: border-box;
  background: var(--ehvp-thumbnail-list-bg);
}
.ehvp-root input, .ehvp-root select {
  color: var(--ehvp-theme-font-color);
  background-color: var(--ehvp-theme-bg-color);
  border: 1px solid #000000;
  border-radius: 4px;
  margin: 0px;
  padding: 0px;
  text-align: center;
  vertical-align: middle;
}
.ehvp-root input:enabled:hover, .ehvp-root select:enabled:hover, .ehvp-root input:enabled:focus, .ehvp-root select:enabled:focus {
  background-color: #34355b !important;
}
.ehvp-root select option {
  background-color: #34355b !important;
  color: #f1f1f1;
  font-size: 1em;
}
.p-label {
  cursor: pointer;
  height: 2em;
}
.p-label > span {
  white-space: nowrap;
}
.p-label > span:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  padding-right: 1.5em;
}
.p-label > span:first-child > .p-tooltip {
  position: absolute;
  right: 0.2em;
}
.full-view-grid, .big-img-frame {
  outline: none !important;
}
.img-node {
  position: relative;
  padding: var(--ehvp-thumbnail-border-size);
  box-sizing: border-box;
  background-color: var(--ehvp-img-init);
  border-radius: var(--ehvp-thumbnail-border-radius);
  box-shadow: var(--ehvp-thumbnail-box-shadow);
}
.fvg-sub-container {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  /**
  contain: content;
  scollbar-width: none;
  */
}
/**
.full-view-grid::-webkit-scrollbar {
  display: none;
}
*/
.fvg-sub-container .img-node {
  height: 100%;
}
.fvg-sub-container .img-node a {
  width: 100%;
  height: 100%;
}
.img-node canvas, .img-node img {
  width: 100%;
  height: 100%;
  border-radius: var(--ehvp-thumbnail-border-radius);
}
.img-node-numtip {
  position: absolute;
  top: 0;
  left: 0.5em;
  font-size: 1.8em;
  font-weight: 900;
  height: 1.8em;
  line-height: 1.8em;
  text-shadow: 0px 0px 3px #000000;
  color: var(--ehvp-theme-font-color);
  display: none;
}
.img-node:hover .img-node-numtip {
  display: block;
}
.img-node > a {
  display: block;
  line-height: 0;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.img-node-actions {
  position: absolute;
  bottom: 10px;
  height: 1.2em;
  left: 0;
  z-index: 1;
}
.img-node-action-btn {
  line-height: 1.2em;
  border: 1px solid #efe;
  text-align: center;
  border-radius: 5px;
  color: #efe;
  font-weight: 900;
  background-color: #1f1f1fc7;
  margin-left: 0.3em;
  text-shadow: #000 1px 0 10px;
  cursor: pointer;
}
.img-node-action-btn:hover {
  border: 1px solid yellow;
  color: yellow;
}
.img-node-action-btn-processing {
  animation: btn-rotate 1s linear infinite;
}
.img-node-action-btn-done {
  border: 1px solid #6eff84;
  color: #6eff84;
}
.img-node-action-btn-error {
  border: 1px solid red;
  color: red;
}
@keyframes btn-rotate {
	0% {
    transform: rotate(0.0turn);
	}
	100% {
    transform: rotate(1.0turn);
	}
}
.ehvp-chapter-description, .img-node-error-hint {
  display: block;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: #708090e3;
  color: #ffe785;
  width: 100%;
  font-weight: 700;
  min-height: 3em;
  font-size: 0.8em;
  padding: 0.5em;
  box-sizing: border-box;
  line-height: 1.3em;
  z-index: 10;
}
.img-node-error-hint {
  color: #8a0000;
}
.img-fetched {
  background-color: var(--ehvp-img-fetched);
}
.img-fetch-failed {
  background-color: var(--ehvp-img-failed);
}
.img-fetching {
  background-color: var(--ehvp-img-fetching);
}
.img-excluded {
  filter: brightness(0.3);
}
.img-fetching::after {
  content: '';
  position: absolute;
  top: 0%;
  left: 0%;
  width: 30%;
  height: 30%;
  background-color: #ff0000;
  animation: img-loading 1s linear infinite;
}
@keyframes img-loading {
	25% {
    background-color: #ff00ff;
    top: 0%;
    left: 70%;
	}
	50% {
    background-color: #00ffff;
    top: 70%;
    left: 70%;
	}
	75% {
    background-color: #ffff00;
    top: 70%;
    left: 0%;
	}
}
.big-img-frame::-webkit-scrollbar {
  display: none;
}
.big-img-frame {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  overflow: auto;
  scrollbar-width: none;
  z-index: 2001;
  background: var(--ehvp-big-images-bg);
  display: flex;
}
.bifm-container > div {
  box-sizing: border-box;
}
.bifm-container-vert {
  width: ${conf.imgScale}%;
  height: fit-content;
  margin: 0 auto;
}
.bifm-container-hori {
  width: fit-content;
  height: ${conf.imgScale}%;
  margin: auto 0;
  display: flex;
  flex-wrap: nowrap;
}
.bifm-container-page {
  width: fit-content;
  height: ${conf.imgScale}%;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
}
.bifm-container-vert > div {
  margin: var(--ehvp-big-images-gap) 0px;
}
.bifm-container-hori > div {
  margin: 0px var(--ehvp-big-images-gap);
}
.bifm-container-page > div {
  height: 100%;
  margin: 0px var(--ehvp-big-images-gap);
  display: flex;
}
.bifm-node-hide {
  position: fixed;
  left: -100%;
  z-index: -1000;
  opacity: 0;
}
.bifm-container-page .bifm-img {
  ${conf.imgScale === 100 && conf.paginationIMGCount === 1 ? "max-width: 100%;" : ""}
}
.bifm-img {
  height: 100%;
  object-fit: contain;
  display: block;
}
.bifm-rotate-90 {
  transform: rotate(90deg);
  width: 100vh;
  height: 100vw;
  transform-origin: 0px 0px;
  left: 100vw;
}
.bifm-rotate-180 {
  transform: rotate(180deg);
}
.bifm-rotate-270 {
  transform: rotate(270deg);
  width: 100vh;
  height: 100vw;
  transform-origin: 0px 0px;
  left: 0px;
  top: 100vh;
}
#bifm-loading-helper {
  position: fixed;
  z-index: 3000;
  display: none;
  padding: 0px 3px;
  background-color: #ffffff90;
  font-weight: blod;
  left: 0px;
}
.ehvp-root-collapse .big-img-frame {
  position: unset;
}
.p-helper {
  position: fixed;
  z-index: 2011 !important;
  box-sizing: border-box;
  top: ${conf.pageHelperAbTop};
  left: ${conf.pageHelperAbLeft};
  bottom: ${conf.pageHelperAbBottom};
  right: ${conf.pageHelperAbRight};
}
.p-panel {
  z-index: 2012 !important;
  background-color: var(--ehvp-theme-bg-color);
  box-sizing: border-box;
  position: fixed;
  color: var(--ehvp-theme-font-color);
  padding: 3px;
  border-radius: 4px;
  font-weight: 800;
  overflow: hidden;
  width: 24em;
  height: 32em;
  max-height: 75vh;
  border: var(--ehvp-panel-border);
  box-shadow: var(--ehvp-panel-box-shadow);
}
.clickable {
  text-decoration-line: underline;
  user-select: none;
  text-align: center;
  white-space: nowrap;
}
.clickable:hover {
  color: var(--ehvp-clickable-color-hover) !important;
}
.p-collapse {
  height: 0px !important;
  padding: 0px !important;
  border: none !important;
}
.b-main {
  display: flex;
  user-select: none;
  flex-direction: ${conf.pageHelperAbLeft === "unset" ? "row-reverse" : "row"};
  flex-wrap: wrap-reverse;
}
.b-main-item {
  box-sizing: border-box;
  border: var(--ehvp-controlbar-border);
  border-radius: 4px;
  background-color: var(--ehvp-theme-bg-color);
  color: var(--ehvp-theme-font-color);
  font-weight: 800;
  padding: 0em 0.3em;
  margin: 0em 0.2em;
  position: relative;
  white-space: nowrap;
  font-size: 1em;
  line-height: 1.2em;
}
.b-main-option {
  padding: 0em 0.2em;
}
.b-main-option-selected {
  color: black;
  background-color: #ffffffa0;
  border-radius: 6px;
}
.b-main-btn {
  display: inline-block;
  width: 1em;
}
.b-main-input {
  color: var(--ehvp-theme-font-color);
  background-color: var(--ehvp-theme-bg-color);
  border-radius: 6px;
  display: inline-block;
  text-align: center;
  width: 1.5em;
  cursor: ns-resize;
}
.chapter-thumbnail {
  width: auto;
  height: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
}
.chapter-thumbnail > #chapter-thumbnail-image-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  just-content: center;
  items-align: center;
  z-index: 1;
}
.chapter-thumbnail > #chapter-thumbnail-image-container > img {
  object-fit: contain;
  display: block;
  height: 100%;
  min-width: 100%;
}
.chapter-thumbnail > canvas {
  width: 100%;
  height: 100%;
  /**
  filter: blur(3px) brightness(0.5);
  */
}
.chapter-list {
  height: 100%;
  width: 100%;
  overflow: hidden auto;
  scrollbar-width: none;
  border-left: 2px solid black;
}
.chapter-list::-webkit-scrollbar {
  display: none;
}
.chapter-list-item {
  width: 100%;
  padding-left: 0.7em;
  white-space: nowrap;
  line-height: 1.8em;
  text-decoration: underline;
}
.chapter-list-item:hover {
  background-color: #cddee3ab;
}
.chapter-list-item-hl {
  filter: brightness(150%);
  background-color: #84c5ff6b;
}
.p-chapters {
  width: 34em;
  height: 18em;
  display: flex;
  max-height: 80%;
  max-width: 100%;
}
.p-chapters-large {
  width: 45em;
  height: 25em;
}
.p-chapters-large .chapter-thumbnail {
  width: auto;
  height: 100%;
}
.p-config {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  align-content: start;
  line-height: 2em;
  overflow: auto scroll;
  scrollbar-width: none;
}
.p-config::-webkit-scrollbar {
  display: none;
}
.p-config label {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  margin-bottom: unset;
}
.p-config input {
  cursor: ns-resize;
}
.p-downloader {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.p-downloader canvas {
  /* border: 1px solid greenyellow; */
}
.p-downloader .download-notice {
  text-align: center;
  width: 100%;
}
.p-downloader .downloader-btn-group {
  align-items: center;
  text-align: right;
  width: 100%;
}
.p-btn {
  color: var(--ehvp-theme-font-color);
  cursor: pointer;
  font-weight: 800;
  background-color: var(--ehvp-theme-bg-color);
  vertical-align: middle;
  width: 1.5em;
  height: 1.5em;
  border: 1px solid #000000;
  border-radius: 4px;
}
@keyframes main-progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
.big-img-frame-collapse {
  display: none;
}
.ehvp-root-collapse .img-land,
.big-img-frame-collapse .img-land,
.ehvp-root-collapse .ehvp-message-box,
.ehvp-root-collapse .p-panel
 {
  display: none !important;
}
.download-bar {
  background-color: #33333310;
  height: 0.3em;
  width: 100%;
  bottom: -0.5em;
  position: absolute;
  box-sizing: border-box;
  z-index: 2;
}
.download-bar > div {
  background-color: var(--ehvp-img-fetched);
  height: 100%;
  border: none;
}
.img-land-left, .img-land-right {
  width: 15%;
  height: 50%;
  position: fixed;
  z-index: 2004;
  top: 25%;
}
.img-land-left {
  left: 0;
  cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC3UlEQVR4nO2ZS28TMRDHV0APcON1gXKisUMRJ0QFJ74EAgQfhMclF15nCqk2noTHcVF2nDRCqBc+AZUKRYR3U0olaODK47JoNiqU0mjX9uymSPlLI0Vayfv72157ZuJ5Qw01lLMCL9gKxfAESLwMAutK4nMQ+BWE/tkL+o3z8bNi41Kl2Dhe8kpbvEGrdhAPKKlvKIlLIHVkGB9A4vXKWH00d/DqWLAXhPaV0D8swP8K1RujfK8Y7s4FXkk8B0J/cQXfwEhXCTyTGbh/1B8BqRU3OPxjBKdKJx9vY4Zv7lBSP8waHlZNSGzRO5ng/ZE84WGNCZaVyGPbQP8ou8KfHyB8RFEV4WkreDrWQOIKF8jsZDuaq7wy30pCd33R3GM++0L7nPCrsjEBEm8ZwdPtyHFJrYe3N4Hf7xam96c2QOlBVvCk2dtt8/EEXksFT0lWL0/JBv7ZnTdW4ymJS5Q0JhroZZXZwM/ff+s0riqEE8kGKCXOAL4dLERQdJsYJfTFFPsfQ274l/VOVD3UcP6mQOCD5BWgwoMR/jUu8sDLeAWepjBgnir3g3/36GNUG+eBhzhwJXkLGZ7//eDfzywzw+v4PmA1UB1vRAszy3xnvWQwYLqFaoebfU3YpQ3abQvZfMR5mVDpPmKs2wyejwkMMr3IMjch8EKiAWo6ubwkSxO+aB5LlcwpqRc3nQmBndTdPOqYuS43twkl9NVU8JwFTT8TTyZfZFvQkKgj4GpgIxPm8Jpm/6ZnKjUe7FJSf+Y0YQnfte6bQkGf5TBAYZuRVqQ+ZQX/eyUETnGZyGXrrBfVoS5FjnUIPc3W5O01d7GVI3wzGA22e5yi2eA6mZK2TYm7vb5W1KvkbDnCn/jk/MGaHLHU7qMLxnnGJX6jWS8fae308hbdjtQxs8qdBHZA4BWQep83aMUJYCGcoL4NtT6o8KDKjtKROCWJqzyco2eUElNWuSn+Zh1qKO//1y8OuBKqSFLycQAAAABJRU5ErkJggg=="), auto;
}
.img-land-right {
  right: 0;
  cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADG0lEQVR4nO2ZS2tTQRTHL2oXuvO10bqymYkVV2LRlV9CVPQrdO9jE/ANPvCZcjvToju5mpxJGqtWwZ1QH4UWa1WotTUWtNWt1VJHTi6V2KbJnZmTW4X8YaAQuPP7z5nHOaee11BDDTkr8IKVMpndIzkclwwygsOwZPBNMvUzHPg3vCr9lswd60zmdqe81ApvudW9FbYIrs4JDkXJlTYcHyWHs50tmebYwbtago2SKV8w9cMC/K8hwm+kbyWz62OBFxwOSaa+uoJXMDItGByoG7i/02+SXAlqcLnICHSk9j5ZRQyfXyO46q03vJw3waGAcxLB+01xwssyEySRiGPbyKVH2hX+8DLCaxxdLLvfCh6vNclhynTCR+39+sXl13Rbialpn+U3mK8+U77pZI/b+/Xc7JxGvbwyQhgJuG4Ej6+j6SNVDj8vukjAzM1Ez+bIBjA9MJ1k9F5RV9Lzi8M0JhiciQSPSVaYpxgettacHi0sYeKSeyQEhyImjTUNhFml3SRVTRBEQiSybbUNYErsMEk1E88uuJkQTB2NsP8h67pSVU2cdzDB4E7tCGDhQXDoljTxS+unJ4dsIzAUwQBdqty9Pa8/9E1WNnFi0OKbMFV7CxEUKfUzATOxG8AxcONNxfMwcnuM3gB1tTVwrTL827vjumtbjn4LUR3iqvAZG3gV9RBDpp7w72DCCl6GEQjq/pBVg8d8Ca9X628zOFLTADad6gH/vreou13gudI+y++KlMwJriZI4e9/coaXDMYjd/OwY0YG/4AAnpcO8OlI8LYFDSZqCzX2kAZemhY0YRRU2nSichNjfZOlV9gdXuHqX/VMJVqDdYKrLzYmiOGnrfumMqEO2kxqf8+rRaOTq31W8H8iwaCDCiaWrbNQWIdSFDnGg6kesiZv2NyFQozw+aA5WO1RClfD5may2TYp6vZ6ubBXadNyjDA+Ox9YkysW2334wDivOIfvuOrpHYW1XtzC1xE7Zla5E4NxyeCU5GqTt9wqJYCJbBv2bbD1gYUHVnaYjpRSklKVB4P4G6bEmFX+E/9mbagh7//Xb5hJEJPq8mugAAAAAElFTkSuQmCC"), auto;
}
.p-tooltip { }
.p-tooltip .p-tooltiptext {
  display: none;
  max-width: 34em;
  background-color: var(--ehvp-theme-bg-color);
  color: var(--ehvp-theme-font-color);
  border-radius: 6px;
  position: fixed;
  z-index: 1;
  font-size: small;
  white-space: normal;
  text-align: left;
  padding: 0.3em 1em;
  box-sizing: border-box;
  pointer-events: none;
}
.page-loading {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #333333a6;
}
.page-loading-text {
  color: var(--ehvp-theme-font-color);
  font-size: 6em;
}
@keyframes rotate {
	100% {
		transform: rotate(1turn);
	}
}
.border-ani {
	position: relative;
	z-index: 0;
	overflow: hidden;
}
.border-ani::before {
	content: '';
	position: absolute;
	z-index: -2;
	left: -50%;
	top: -50%;
	width: 200%;
	height: 200%;
	background-color: #fff;
	animation: rotate 4s linear infinite;
}
.border-ani::after {
	content: '';
	position: absolute;
	z-index: -1;
	left: 6px;
	top: 6px;
	width: calc(100% - 16px);
	height: calc(100% - 16px);
	background-color: #333;
}
.overlay-tip {
  position: absolute;
  z-index: 10;
  font-weight: 800;
  top: 0.3em;
  right: 0.3em;
  font-size: 0.8em;
  color: var(--ehvp-theme-font-color);
  text-shadow: 0px 0px 3px #000000;
}
.lightgreen { color: #90ea90; }
.ehvp-full-panel {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000000e8;
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
}
.ehvp-custom-panel {
  min-width: 50vw;
  min-height: 50vh;
  max-width: 80vw;
  max-height: 80vh;
  background-color: var(--ehvp-theme-bg-color);
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  text-align: start;
  color: var(--ehvp-theme-font-color);
  position: relative;
  user-select: none;
}
.ehvp-custom-panel-title {
  font-size: 1.8em;
  line-height: 2em;
  font-weight: 800;
  display: flex;
  justify-content: space-between;
  padding-left: 1em;
}
.ehvp-custom-panel-close {
  width: 2em;
  text-align: center;
}
.ehvp-custom-panel-close:hover {
  background-color: #c3c0e0;
}
.ehvp-custom-panel-container {
  overflow: auto;
  scrollbar-width: thin;
}
.ehvp-custom-panel-content {
  border: 1px solid #000000;
  border-radius: 4px;
  margin: 0.5em;
  padding: 0.5em;
}
.ehvp-custom-panel-item {
  margin: 0.2em 0em;
}
.ehvp-custom-panel-item-title {
  font-size: 1.4em;
}
.ehvp-custom-panel-item-values {
  margin-top: 0.3em;
  text-align: end;
  line-height: 1.3em;
}
.ehvp-custom-panel-item-value {
  font-size: 1.1em;
  font-weight: 800;
  color: black;
  background-color: #c5c5c5;
  border: 1px solid #000000;
  box-sizing: border-box;
  margin-left: 0.3em;
  display: inline-flex;
}
.ehvp-custom-panel-item-value span {
  padding: 0em 0.5em;
}
.ehvp-custom-panel-item-value button {
  background-color: #fff;
  color: black;
  border: none;
}
.ehvp-custom-panel-item-value button:hover {
  background-color: #ffff00;
}
.ehvp-custom-panel-item-input, .ehvp-custom-panel-item-span {
  font-size: 1.1em;
  font-weight: 800;
  background-color: #7fef7b;
  color: black;
  border: none;
}
.ehvp-custom-panel-item-span {
  background-color: #34355b;
  color: white;
}
.ehvp-custom-panel-item-add-btn:hover {
  background-color: #ffff00 !important;
}
.ehvp-custom-panel-list > li {
  line-height: 3em;
  margin-left: 0.5em;
  font-size: 1.4em;
}
.ehvp-custom-panel-checkbox:hover {
  border: 1px solid var(--ehvp-theme-font-color);
}
.ehvp-custom-panel-list-item-disable {
  text-decoration: line-through;
  color: red;
}
.ehvp-help-panel > div > h2 {
  color: #c1ffc9;
}
.ehvp-help-panel > div > p {
  font-size: 1.1em;
  margin-left: 1em;
  font-weight: 600;
}
.ehvp-help-panel > div > ul {
  font-size: 1em;
}
.ehvp-help-panel > div a {
  color: #ff5959;
}
.ehvp-help-panel > div strong {
  color: #d76d00;
}
.bifm-vid-ctl {
  position: fixed;
  z-index: 2010;
  padding: 3px 10px;
  bottom: 0.2em;
  ${conf.pageHelperAbLeft === "unset" ? "left: 0.2em;" : "right: 0.2em;"}
}
.bifm-vid-ctl > div {
  display: flex;
  align-items: center;
  line-height: 1.2em;
}
.bifm-vid-ctl > div > * {
  margin: 0 0.1em;
}
.bifm-vid-ctl:not(:hover) .bifm-vid-ctl-btn,
.bifm-vid-ctl:not(:hover) .bifm-vid-ctl-span,
.bifm-vid-ctl:not(:hover) #bifm-vid-ctl-volume
{
  opacity: 0;
}
.bifm-vid-ctl-btn {
  height: 1.5em;
  width: 1.5em;
  font-size: 1.2em;
  padding: 0;
  margin: 0;
  border: none;
  background-color: #00000000;
  cursor: pointer;
}
#bifm-vid-ctl-volume {
  width: 5em;
  height: 0.5em;
}
.bifm-vid-ctl-pg {
  border: 1px solid #00000000;
  background-color: #3333337e;
  -webkit-appearance: none;
}
#bifm-vid-ctl-pg {
  width: 100%;
  height: 0.2em;
  background-color: #333333ee;
}
.bifm-vid-ctl:hover {
  background-color: var(--ehvp-theme-bg-color);
}
.bifm-vid-ctl:hover #bifm-vid-ctl-pg {
  height: 0.8em;
}
.bifm-vid-ctl-pg-inner {
  background-color: #ffffffa0;
  height: 100%;
}
.bifm-vid-ctl:hover #bifm-vid-ctl-pg .bifm-vid-ctl-pg-inner {
  background-color: #fff;
}
.bifm-vid-ctl-span {
  color: white;
  font-weight: 800;
}
.download-middle {
  width: 100%;
  height: auto;
  flex-grow: 1;
  overflow: hidden;
}
.download-middle .ehvp-tabs + div {
  width: 100%;
  height: calc(100% - 2em);
}
.ehvp-tabs {
  height: 2em;
  width: 100%;
  line-height: 2em;
}
.ehvp-p-tab {
  border: 1px dotted #ff0;
  font-size: 1em;
  padding: 0 0.4em;
}
.download-chapters, .download-status, .download-cherry-pick {
  width: 100%;
  height: 100%;
}
.download-chapters {
  overflow: hidden auto;
}
.download-chapters label {
  white-space: nowrap;
}
.download-chapters label span {
  margin-left: 0.5em;
}
.ehvp-p-tab-selected {
  color: rgb(120, 240, 80) !important;
}
.ehvp-message-box {
  position: fixed;
  z-index: 4001;
  top: 0;
  left: 0;
}
.ehvp-message {
  margin-top: 1em;
  margin-left: 1em;
  line-height: 2em;
  background-color: #ffffffd6;
  border-radius: 6px;
  padding-left: 0.3em;
  position: relative;
  box-shadow: inset 0 0 5px 2px #8273ff;
  color: black;
}
.ehvp-message > button {
  border: 1px solid #00000000;
  margin-left: 1em;
  color: black;
  background-color: #00000000;
  height: 2em;
  width: 2em;
  text-align: center;
  font-weight: 800;
}
.ehvp-message > button:hover {
  background-color: #444;
}
.ehvp-message-duration-bar {
  position: absolute;
  bottom: 0;
  width: 0%;
  left: 0;
  height: 0.1em;
  background: red;
}
.ehvp-custom-btn {
  border: 1px solid #000;
  font-weight: 700;
  color: #000;
  background-color: #ffffff80;
}
.ehvp-custom-btn-plain {
  background-color: #aaa;
}
.ehvp-custom-btn-green {
  background-color: #7fef7b;
}
.ehvp-custom-btn:hover {
  border: 1px solid #fff;
  color: #333;
  background-color: #ffffff90;
  filter: brightness(150%);
}
.ehvp-custom-btn:active {
  color: #ccc;
}
.ehvp-custom-panel-list-item-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #000;
  padding: 0em 1em;
}
.ehvp-custom-panel-title:hover, .ehvp-custom-panel-list-item-title:hover {
  background-color: #33333388;
}
.s-pickable:hover {
  border: 1px solid red;
  filter: brightness(150%);
}
#tag-candidates > .tc-selected {
  color: red;
  background-color: #fff;
}
#tag-candidates > li:hover {
  color: green;
  background-color: #aaa;
}
#auto-page-progress {
  height: 100%;
  width: 0%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: var(--ehvp-playing-progress-bar-color);
}
@media (max-width: ${IS_MOBILE ? "1440px" : "720px"}) {
  .ehvp-root {
    font-size: 4cqw;
  }
  .ehvp-root-collapse #entry-btn {
    font-size: 2.2em;
  }
  .p-helper {
    bottom: 0px;
    left: 0px;
    top: unset;
    right: unset;
  }
  .b-main {
    flex-direction: row;
  }
  .b-main-item {
    font-size: 1.3em;
    margin-top: 0.2em;
  }
  #pagination-adjust-bar,
  #scale-bar
  {
    display: none;
  }
  .p-panel {
    width: 100%;
    font-size: 5cqw;
  }
  .p-chapters {
    width: 100%;
  }
  .ehvp-custom-panel {
    max-width: 100%;
  }
  .ehvp-root input, .ehvp-root select {
    width: 2em;
    height: 1.2em;
    font-size: 1em;
  }
  .ehvp-root select {
    width: 7em !important;
  }
  .p-btn {
    font-size: 1em;
  }
  .bifm-vid-ctl {
    display: none;
  }
  .ehvp-custom-panel-list-item-title {
    display: block;
  }
  .chapter-thumbnail {
    display: none;
  }
  .bifm-container-hori > div {
    width: 100%;
  }
}
`;
    return css;
  }

  class DownloaderPanel {
    root;
    panel;
    canvas;
    tabStatus;
    tabChapters;
    tabCherryPick;
    statusElement;
    chaptersElement;
    cherryPickElement;
    noticeElement;
    forceBTN;
    startBTN;
    btn;
    constructor(root) {
      this.root = root;
      this.btn = q("#downloader-panel-btn", root);
      this.panel = q("#downloader-panel", root);
      this.canvas = q("#downloader-canvas", root);
      this.tabStatus = q("#download-tab-status", root);
      this.tabChapters = q("#download-tab-chapters", root);
      this.tabCherryPick = q("#download-tab-cherry-pick", root);
      this.statusElement = q("#download-status", root);
      this.chaptersElement = q("#download-chapters", root);
      this.cherryPickElement = q("#download-cherry-pick", root);
      this.noticeElement = q("#download-notice", root);
      this.forceBTN = q("#download-force", root);
      this.startBTN = q("#download-start", root);
      this.panel.addEventListener("transitionend", () => EBUS.emit("downloader-canvas-resize"));
    }
    initTabs() {
      const elements = [this.statusElement, this.chaptersElement, this.cherryPickElement];
      const tabs = [
        {
          ele: this.tabStatus,
          cb: () => {
            elements.forEach((e, i) => e.hidden = i != 0);
            EBUS.emit("downloader-canvas-resize");
          }
        },
        {
          ele: this.tabChapters,
          cb: () => {
            elements.forEach((e, i) => e.hidden = i != 1);
          }
        },
        {
          ele: this.tabCherryPick,
          cb: () => {
            elements.forEach((e, i) => e.hidden = i != 2);
            q("#download-cherry-pick-input", this.cherryPickElement).focus();
          }
        }
      ];
      tabs.forEach(({ ele, cb }, i) => {
        ele.addEventListener("click", () => {
          ele.classList.add("ehvp-p-tab-selected");
          tabs.filter((_, j) => j != i).forEach((t) => t.ele.classList.remove("ehvp-p-tab-selected"));
          cb();
        });
      });
    }
    switchTab(tabID) {
      switch (tabID) {
        case "status":
          this.tabStatus.click();
          break;
        case "chapters":
          this.tabChapters.click();
          break;
        case "cherry-pick":
          this.tabCherryPick.click();
          break;
      }
    }
    initNotice(btns) {
      this.noticeElement.innerHTML = "";
      btns.forEach((b) => {
        const a = document.createElement("a");
        a.textContent = b.btn;
        a.classList.add("clickable");
        a.style.color = "gray";
        a.style.margin = "0em 0.5em";
        a.addEventListener("click", b.cb);
        this.noticeElement.append(a);
      });
    }
    abort(stage) {
      this.flushUI(stage);
      this.normalizeBTN();
    }
    flushUI(stage) {
      this.startBTN.style.color = stage === "downloadFailed" ? "red" : "";
      this.startBTN.textContent = i18n[stage].get();
      this.btn.style.color = stage === "downloadFailed" ? "red" : "";
    }
    noticeableBTN() {
      if (!this.btn.classList.contains("lightgreen")) {
        this.btn.classList.add("lightgreen");
        if (!/✓/.test(this.btn.textContent)) {
          this.btn.textContent += "✓";
        }
      }
    }
    normalizeBTN() {
      this.btn.textContent = this.btn.textContent.replace("✓", "");
      this.btn.classList.remove("lightgreen");
    }
    createChapterSelectList(chapters, selectedChapters) {
      const selectAll = chapters.length === 1;
      this.chaptersElement.innerHTML = `
      <div>
        <span id="download-chapters-select-all" class="clickable">Select All</span>
        <span id="download-chapters-unselect-all" class="clickable">Unselect All</span>
        <span id="download-chapters-add-new" class="clickable">Add New Chapters</span>
      </div>
      ${chapters.map((c, i) => `<div><label>
        <input type="checkbox" id="ch-${c.id}" value="${c.id}" ${selectAll || selectedChapters.find((sel) => sel.index === i) ? "checked" : ""} />
        <span>${c.title}</span></label></div>`).join("")}`;
      [["#download-chapters-select-all", true], ["#download-chapters-unselect-all", false]].forEach(
        ([id, checked]) => this.chaptersElement.querySelector(id)?.addEventListener(
          "click",
          () => chapters.forEach((c) => {
            const checkbox = this.chaptersElement.querySelector("#ch-" + c.id);
            if (checkbox) checkbox.checked = checked;
          })
        )
      );
      this.chaptersElement.querySelector("#download-chapters-add-new")?.addEventListener("click", (event) => {
        function modal(root, target, inner, onComfirm) {
          const div = document.createElement("div");
          div.style.position = "fixed";
          div.style.zIndex = "2100";
          div.style.padding = "3px";
          div.style.backgroundColor = "var(--ehvp-theme-bg-color)";
          div.style.border = "var(--ehvp-panel-border)";
          div.style.borderRadius = "5px";
          div.innerHTML = `
          <div style="display: flex; justify-content: center; margin: 10px 2px;">${inner}</div>
          <div style="display: flex; justify-content: center;">
            <button class="ehvp-custom-btn ehvp-modal-btn-cancel" style="background-color: gray;">Cancel</button>
            <button class="ehvp-custom-btn ehvp-modal-btn-confirm" style="background-color: var(--ehvp-clickable-color-hover);">Confirm</button>
          </div>
        `;
          root.appendChild(div);
          div.querySelector(".ehvp-modal-btn-cancel")?.addEventListener("click", () => div.remove());
          div.querySelector(".ehvp-modal-btn-confirm")?.addEventListener("click", () => onComfirm(div).finally(() => div.remove()));
          relocateElement(div, target, root.offsetWidth, root.offsetHeight);
        }
        modal(
          this.root,
          event.target,
          `<input id="download-chapters-add-input" style="width: 250px; background-color: #ffffff80;" placeholder="https://example.com" />`,
          async (div) => {
            const value = div.querySelector("#download-chapters-add-input")?.value;
            if (!value) return;
            const future = EBUS.emit("pf-append-chapters", value);
            if (future) await future;
          }
        );
      });
    }
    selectedChapters() {
      const idSet = /* @__PURE__ */ new Set();
      this.chaptersElement.querySelectorAll("input[type=checkbox][id^=ch-]:checked").forEach((checkbox) => idSet.add(Number(checkbox.value)));
      return idSet;
    }
    initCherryPick(onAdd, onRemove, onClear, getRangeList) {
      let chapterIndex = 0;
      function addRangeElements(container, rangeList, onRemove2) {
        container.querySelectorAll(".ehvp-custom-panel-item-value").forEach((e) => e.remove());
        const tamplate = document.createElement("div");
        rangeList.forEach((range) => {
          const str = `<span class="ehvp-custom-panel-item-value" data-id="${range.id}"><span >${range.toString()}</span><span class="ehvp-custom-btn ehvp-custom-btn-plain" style="padding:0;border:none;">&nbspx&nbsp</span></span>`;
          tamplate.innerHTML = str;
          const element = tamplate.firstElementChild;
          element.style.backgroundColor = range.positive ? "#7fef7b" : "#ffa975";
          container.appendChild(element);
          element.querySelector(".ehvp-custom-btn").addEventListener("click", (event) => {
            const parent = event.target.parentElement;
            onRemove2(parent.getAttribute("data-id"));
            parent.remove();
          });
          tamplate.remove();
        });
      }
      const pickBTN = q("#download-cherry-pick-btn-add", this.cherryPickElement);
      const excludeBTN = q("#download-cherry-pick-btn-exclude", this.cherryPickElement);
      const clearBTN = q("#download-cherry-pick-btn-clear", this.cherryPickElement);
      const rangeBeforeSpan = q("#download-cherry-pick-btn-range-before", this.cherryPickElement);
      const rangeAfterSpan = q("#download-cherry-pick-btn-range-after", this.cherryPickElement);
      const input = q("#download-cherry-pick-input", this.cherryPickElement);
      const addCherryPick = (exclude, range) => {
        const rangeList = range ? [CherryPickRange.from((exclude ? "!" : "") + range)].filter((r) => r !== null) : (input.value || "").split(",").map((s) => (exclude ? "!" : "") + s).map(CherryPickRange.from).filter((r) => r !== null);
        if (rangeList.length > 0) {
          rangeList.forEach((range2) => {
            const newList = onAdd(chapterIndex, range2);
            if (newList === null) return;
            addRangeElements(this.cherryPickElement.firstElementChild, newList, (id) => onRemove(chapterIndex, id));
          });
        }
        input.value = "";
        input.focus();
      };
      const clearPick = () => {
        onClear(chapterIndex);
        addRangeElements(this.cherryPickElement.firstElementChild, [], (id) => onRemove(chapterIndex, id));
        input.value = "";
        input.focus();
      };
      pickBTN.addEventListener("click", () => addCherryPick(false));
      excludeBTN.addEventListener("click", () => addCherryPick(true));
      clearBTN.addEventListener("click", clearPick);
      this.cherryPickElement.querySelectorAll(".download-cherry-pick-follow-btn").forEach((btn) => {
        const followBTNClick = () => {
          const step = parseInt(btn.getAttribute("data-sibling-step") || "1");
          let sibling = btn;
          for (let i = 0; i < step; i++) {
            sibling = sibling.previousElementSibling;
          }
          if (step <= 1) {
            clearPick();
          }
          addCherryPick(step > 1, sibling.getAttribute("data-range") || void 0);
        };
        btn.addEventListener("click", followBTNClick);
      });
      input.addEventListener("keypress", (event) => event.key === "Enter" && addCherryPick(false));
      let lastIndex = 0;
      EBUS.subscribe("add-cherry-pick-range", (chIndex, index, positive, shiftKey) => {
        const range = new CherryPickRange([index + 1, shiftKey ? (lastIndex ?? index) + 1 : index + 1], positive);
        lastIndex = index;
        addRangeElements(this.cherryPickElement.firstElementChild, onAdd(chIndex, range) || [], (id) => onRemove(chIndex, id));
      });
      EBUS.subscribe("pf-change-chapter", (index) => {
        if (index === -1) return;
        chapterIndex = index;
        addRangeElements(this.cherryPickElement.firstElementChild, getRangeList(chapterIndex) || [], (id) => onRemove(chapterIndex, id));
      });
      let pad = 0;
      EBUS.subscribe("pf-on-appended", (total) => {
        pad = total.toString().length;
        const rAfter = rangeAfterSpan.getAttribute("data-range").split("-").map((v) => v.padStart(pad, "0")).join("-");
        rangeAfterSpan.textContent = rAfter;
        rangeAfterSpan.setAttribute("data-range", rAfter);
        const rBefore = rangeBeforeSpan.getAttribute("data-range").split("-").map((v, i) => i === 1 ? total.toString() : v.padStart(pad, "0")).join("-");
        rangeBeforeSpan.textContent = rBefore;
        rangeBeforeSpan.setAttribute("data-range", rBefore);
      });
      EBUS.subscribe("ifq-do", (index) => {
        const rAfter = [1, index + 1].map((v) => v.toString().padStart(pad, "0")).join("-");
        rangeAfterSpan.textContent = rAfter;
        rangeAfterSpan.setAttribute("data-range", rAfter);
        const rBefore = rangeBeforeSpan.getAttribute("data-range").split("-").map((v, i) => i === 0 ? (index + 1).toString().padStart(pad, "0") : v).join("-");
        rangeBeforeSpan.textContent = rBefore;
        rangeBeforeSpan.setAttribute("data-range", rBefore);
      });
    }
    static html() {
      return `
<div id="downloader-panel" class="p-panel p-downloader p-collapse">
    <div id="download-notice" class="download-notice" style="font-size: 0.7em;"></div>
    <div id="download-middle" class="download-middle">
      <div class="ehvp-tabs">
        <a id="download-tab-status" class="clickable ehvp-p-tab">${i18n.status.get()}</a>
        <a id="download-tab-cherry-pick" class="clickable ehvp-p-tab">${i18n.cherryPick.get()}</a>
        <a id="download-tab-chapters" class="clickable ehvp-p-tab">${i18n.selectChapters.get()}</a>
      </div>
      <div>
        <div id="download-status" class="download-status" hidden>
          <canvas id="downloader-canvas" width="0" height="0"></canvas>
        </div>
        <div id="download-cherry-pick" class="download-cherry-pick" hidden>
          <div class="ehvp-custom-panel-item-values" style="text-align: start;">
            <div style="margin-bottom: 1rem;display: flex;">
              <input type="text" class="ehvp-custom-panel-item-input" id="download-cherry-pick-input" placeholder="1, 2-3" style="text-align: start; width: 50%; height: 1.3rem; border-radius: 0px;" />
              <span class="ehvp-custom-btn ehvp-custom-btn-green" id="download-cherry-pick-btn-add">Pick</span>
              <span class="ehvp-custom-btn ehvp-custom-btn-plain" id="download-cherry-pick-btn-exclude">Exclude</span>
              <span class="ehvp-custom-btn ehvp-custom-btn-plain" id="download-cherry-pick-btn-clear">Clear</span>
            </div>
            <div style="margin-bottom: 1rem;">
              <div style="margin-bottom: 0.2rem">
                <span class="ehvp-custom-panel-item-span" id="download-cherry-pick-btn-range-after" data-range="1-1">1-1</span><span
                 class="ehvp-custom-btn ehvp-custom-btn-green download-cherry-pick-follow-btn" data-sibling-step="1">pick</span><span
                 class="ehvp-custom-btn ehvp-custom-btn-plain download-cherry-pick-follow-btn" data-sibling-step="2">exclude</span>
              </div>
              <div>
                <span class="ehvp-custom-panel-item-span" id="download-cherry-pick-btn-range-before" data-range="1-1">1-1</span><span
                class="ehvp-custom-btn ehvp-custom-btn-green download-cherry-pick-follow-btn" data-sibling-step="1">pick</span><span
                class="ehvp-custom-btn ehvp-custom-btn-plain download-cherry-pick-follow-btn" data-sibling-step="2">exclude</span>
              </div>
            </div>
          </div>
        </div>
        <div id="download-chapters" class="download-chapters" hidden></div>
      </div>
    </div>
    <div class="download-btn-group">
       <a id="download-force" class="clickable">${i18n.forceDownload.get()}</a>
       <a id="download-start" style="color: rgb(120, 240, 80)" class="clickable">${i18n.downloadStart.get()}</a>
    </div>
</div>`;
    }
  }

  class ConfigPanel {
    panel;
    btn;
    constructor(root) {
      this.panel = q("#config-panel", root);
      this.btn = q("#config-panel-btn", root);
      this.panel.querySelectorAll(".p-tooltip").forEach((element) => {
        const child = element.querySelector(".p-tooltiptext");
        if (!child) return;
        element.addEventListener("mouseenter", () => {
          child.style.display = "block";
          relocateElement(child, element, root.offsetWidth, root.offsetHeight);
        });
        element.addEventListener("mouseleave", () => child.style.display = "none");
      });
    }
    initEvents(events) {
      ConfigItems.forEach((item) => {
        switch (item.typ) {
          case "number":
            q(`#${item.key}MinusBTN`, this.panel).addEventListener("click", () => events.modNumberConfigEvent(item.key, "minus"));
            q(`#${item.key}AddBTN`, this.panel).addEventListener("click", () => events.modNumberConfigEvent(item.key, "add"));
            q(`#${item.key}Input`, this.panel).addEventListener("wheel", (event) => {
              event.preventDefault();
              if (event.deltaY < 0) {
                events.modNumberConfigEvent(item.key, "add");
              } else if (event.deltaY > 0) {
                events.modNumberConfigEvent(item.key, "minus");
              }
            });
            break;
          case "boolean":
            q(`#${item.key}Checkbox`, this.panel).addEventListener("click", () => events.modBooleanConfigEvent(item.key));
            break;
          case "select":
            q(`#${item.key}Select`, this.panel).addEventListener("change", () => events.modSelectConfigEvent(item.key));
            break;
        }
      });
    }
    static html() {
      const configItemStr = ConfigItems.map(createOption).join("");
      return `
<div id="config-panel" class="p-panel p-config p-collapse">
    ${configItemStr}
    <div style="grid-column-start: 1; grid-column-end: 11; padding-left: 5px;">
        <label class="p-label">
            <span>${i18n.dragToMove.get()}:</span>
            <span id="dragHub" style="font-size: 1.85rem;cursor: grab;">✠</span>
        </label>
    </div>
    <div style="grid-column-start: 1; grid-column-end: 11; padding-left: 5px; text-align: left;">
         <a id="show-guide-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.showHelp.get()}</a>
         <a id="show-keyboard-custom-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.showKeyboard.get()}</a>
         <a id="show-site-profiles-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.showSiteProfiles.get()}</a>
         <a id="show-style-custom-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.showStyleCustom.get()}</a>
         <a id="show-action-custom-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.showActionCustom.get()}</a>
         <a id="reset-config-element" class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;">${i18n.resetConfig.get()}</a>
         <a class="clickable" style="border: 1px dotted #fff; padding: 0px 3px;" href="https://github.com/MapoMagpie/eh-view-enhance" target="_blank">${i18n.letUsStar.get()}</a>
    </div>
</div>`;
    }
  }
  function createOption(item) {
    const i18nKey = item.i18nKey || item.key;
    const i18nValue = i18n[i18nKey];
    const i18nValueTooltip = i18n[`${i18nKey}Tooltip`];
    if (!i18nValue) {
      throw new Error(`i18n key ${i18nKey} not found`);
    }
    let display = true;
    if (item.displayInSite) {
      display = item.displayInSite.test(location.href);
    }
    let input = "";
    switch (item.typ) {
      case "boolean":
        input = `<input id="${item.key}Checkbox" ${conf[item.key] ? "checked" : ""} type="checkbox" />`;
        break;
      case "number":
        input = `<span>
                  <button id="${item.key}MinusBTN" class="p-btn" type="button">-</button>
                  <input id="${item.key}Input" value="${conf[item.key]}" disabled type="text" />
                  <button id="${item.key}AddBTN" class="p-btn" type="button">+</button></span>`;
        break;
      case "select":
        if (!item.options) {
          throw new Error(`options for ${item.key} not found`);
        }
        const optionsStr = item.options.map((o) => `<option value="${o.value}" ${conf[item.key] == o.value ? "selected" : ""}>${o.display}</option>`).join("");
        input = `<select id="${item.key}Select">${optionsStr}</select>`;
        break;
    }
    const [start, end] = item.gridColumnRange ? item.gridColumnRange : [1, 11];
    return `<div style="grid-column-start: ${start}; grid-column-end: ${end}; padding-left: 5px;${display ? "" : " display: none;"}"><label class="p-label"><span><span>${i18nValue.get()}</span><span class="p-tooltip">${i18nValueTooltip ? " ?:" : " :"}<span class="p-tooltiptext">${i18nValueTooltip?.get() || ""}</span></span></span>${input}</label></div>`;
  }

  class ChaptersPanel {
    panel;
    root;
    thumbnail;
    thumbnailImg;
    thumbnailCanvas;
    listContainer;
    constructor(root) {
      this.root = root;
      this.panel = q("#chapters-panel", root);
      this.thumbnail = q("#chapter-thumbnail", root);
      this.thumbnailImg = q("#chapter-thumbnail-image", root);
      this.thumbnailCanvas = q("#chapter-thumbnail-canvas", root);
      this.listContainer = q("#chapter-list", root);
      EBUS.subscribe("pf-update-chapters", (chapters, slient) => {
        this.updateChapterList(chapters);
        if (chapters.length > 1 && !slient) {
          this.relocateToCenter();
        }
      });
      EBUS.subscribe("pf-change-chapter", (index, chapter) => this.updateHighlight(index, chapter));
    }
    updateChapterList(chapters) {
      const ul = this.listContainer.firstElementChild;
      ul.innerHTML = "";
      chapters.forEach((ch, i) => {
        const li = document.createElement("div");
        let title = "";
        if (ch.title instanceof Array) {
          title = ch.title.join("	");
        } else {
          title = ch.title;
        }
        li.innerHTML = `<span>${title}</span>`;
        li.setAttribute("id", "chapter-list-item-" + ch.id.toString());
        li.classList.add("chapter-list-item");
        li.addEventListener("click", () => {
          ch.onclick?.(i);
          if (this.panel.classList.contains("p-panel-large")) {
            this.panel.classList.add("p-collapse");
            this.panel.classList.remove("p-panel-large");
            this.panel.classList.remove("p-chapters-large");
          }
        });
        li.addEventListener("mouseenter", () => this.updateChapterThumbnail(ch));
        ul.appendChild(li);
      });
      this.updateChapterThumbnail(chapters[0]);
    }
    relocateToCenter() {
      this.panel.classList.remove("p-collapse");
      this.panel.classList.add("p-panel-large");
      this.panel.classList.add("p-chapters-large");
      const [w, h] = [this.root.offsetWidth, this.root.offsetHeight];
      const [pw, ph] = [this.panel.offsetWidth, this.panel.offsetHeight];
      const [left, top] = [w / 2 - pw / 2, h / 2 - ph / 2];
      this.panel.style.left = left + "px";
      this.panel.style.top = top + "px";
    }
    updateHighlight(index, chapter) {
      Array.from(this.listContainer.querySelectorAll("div > .chapter-list-item")).forEach((li, i) => {
        if (i === index) {
          li.classList.add("chapter-list-item-hl");
        } else {
          li.classList.remove("chapter-list-item-hl");
        }
      });
      this.updateChapterThumbnail(chapter);
    }
    updateChapterThumbnail(chapter) {
      this.thumbnailImg.onload = () => {
        const width = this.thumbnailImg.naturalWidth;
        const height = this.thumbnailImg.naturalHeight;
        let [sx, sw, sy, sh] = [0, width, 0, height];
        if (width > height) {
          sx = Math.floor((width - height) / 2);
          sw = height;
        } else if (width < height) {
          sy = Math.floor((height - width) / 2);
          sh = width;
        }
        this.thumbnailCanvas.width = sw;
        this.thumbnailCanvas.height = sh;
        const ctx = this.thumbnailCanvas.getContext("2d");
        ctx.drawImage(this.thumbnailImg, sx, sy, sw, sh, 0, 0, width, height);
      };
      this.thumbnailImg.src = chapter.thumbimg ?? DEFAULT_THUMBNAIL;
      this.thumbnail.querySelector(".ehvp-chapter-description")?.remove();
      const description = document.createElement("div");
      description.classList.add("ehvp-chapter-description");
      if (Array.isArray(chapter.title)) {
        description.innerHTML = chapter.title.map((t) => `<span>${t}</span>`).join("<br>");
      } else {
        description.innerHTML = `<span>${chapter.title}</span>`;
      }
      this.thumbnail.appendChild(description);
    }
    static html() {
      return `
<div id="chapters-panel" class="p-panel p-chapters p-collapse">
    <div id="chapter-thumbnail" class="chapter-thumbnail">
      <div id="chapter-thumbnail-image-container" style="display:none;">
        <img id="chapter-thumbnail-image" src="${DEFAULT_THUMBNAIL}" alt="thumbnail" />
      </div>
      <canvas id="chapter-thumbnail-canvas" width="100" height="100"></canvas>
    </div>
    <div id="chapter-list" class="chapter-list">
      <div></div>
    </div>
</div>`;
    }
  }

  class FilterPanel {
    panel;
    root;
    filter;
    input;
    list;
    candidates;
    candidatasFragment;
    candidateSelectIndex = 0;
    candidateCached = [];
    constructor(root, filter) {
      this.root = root;
      this.panel = q("#filter-panel", root);
      this.input = q("#tag-input", this.panel);
      this.list = q("#tag-list", this.panel);
      this.candidates = q("#tag-candidates", this.panel);
      this.candidatasFragment = document.createDocumentFragment();
      this.filter = filter;
      this.input.addEventListener("click", () => EBUS.emit("filter-update-all-tags"));
      this.input.addEventListener("input", () => {
        this.candidateSelectIndex = 0;
        this.updateCandidates(false);
      });
      this.input.addEventListener("keyup", (ev) => {
        console.log("keypress ev: ", ev);
        if (ev.key.toLowerCase() === "arrowup") {
          this.candidateSelectIndex = this.candidateSelectIndex - 1;
          this.updateCandidates(true);
          ev.preventDefault();
        } else if (ev.key.toLowerCase() === "arrowdown") {
          this.candidateSelectIndex = this.candidateSelectIndex + 1;
          this.updateCandidates(true);
          ev.preventDefault();
        } else if (ev.key.toLowerCase() === "enter") {
          const tag = this.candidateCached[this.candidateSelectIndex];
          this.input.value = "";
          if (tag) {
            this.filter.push(true, tag);
            this.updateFilterValues();
          }
          this.candidates.hidden = true;
        }
      });
    }
    updateCandidates(noCache) {
      if (this.input.value.length === 0) {
        this.candidates.hidden = true;
        return;
      }
      const term = this.input.value.trim();
      if (!noCache) {
        this.candidateCached = [...this.filter.allTags].filter((t) => !term || t.includes(term));
      }
      if (this.candidateCached.length > 500) {
        this.candidates.hidden = true;
        return;
      }
      this.candidateSelectIndex = Math.max(0, this.candidateSelectIndex);
      this.candidateSelectIndex = Math.min(this.candidateCached.length - 1, this.candidateSelectIndex);
      let selected;
      for (let i = 0; i < this.candidateCached.length; i++) {
        const tag = this.candidateCached[i];
        const li = document.createElement("li");
        li.textContent = tag.toString();
        if (i === this.candidateSelectIndex) {
          li.classList.add("tc-selected");
          selected = li;
        }
        li.addEventListener("click", (ev) => {
          const tag2 = ev.target.textContent;
          if (!tag2) return;
          this.input.value = "";
          this.filter.push(true, tag2);
          this.updateFilterValues();
          this.candidates.hidden = true;
        });
        this.candidatasFragment.appendChild(li);
      }
      this.candidates.innerHTML = "";
      this.candidates.append(...Array.from(this.candidatasFragment.childNodes));
      this.candidates.hidden = false;
      selected?.scrollIntoView({ block: "center" });
    }
    updateFilterValues() {
      this.list.innerHTML = "";
      for (const tag of this.filter.values) {
        const li = document.createElement("li");
        li.textContent = tag.tag;
        li.addEventListener("click", (ev) => {
          const tag2 = ev.target.textContent;
          if (!tag2) return;
          this.filter.remove(tag2);
          this.updateFilterValues();
        });
        this.list.appendChild(li);
      }
    }
    static html() {
      return `
<div id="filter-panel" class="p-panel p-filter p-collapse">
    <div style="position: relative;">
      <input id="tag-input" class="tag-input" style="width:76%; margin-top:0.6em; margin-left: 12%;"/>
      <div id="tag-candidates" style="position:absolute; width:100%; min-height:1em; max-height:15em; overflow:auto; background-color:#444; margin-top:0; top:100%;" hidden="true"></div>
    </div>
    <div>
      <ul id="tag-list" class="tag-list">
      <span>Filter the images, unfinished!</span>
      </ul>
    </div>
</div>`;
    }
  }

  function linkify(text) {
    const urlRegex = /https?:\/\/[^\s<>"']+/g;
    return text.replace(urlRegex, (url) => {
      const escapedUrl = escapeHtml(url);
      return `<a target="_blank" href="${escapedUrl}">${escapedUrl}</a>`;
    });
  }
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (char) => {
      switch (char) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#39;";
        default:
          return char;
      }
    });
  }

  function createHTML(filter) {
    const base = document.createElement("div");
    const dt = getDisplayText();
    base.id = "ehvp-base";
    base.setAttribute("style", "all: initial");
    document.body.after(base);
    const HTML_STRINGS = `
<div id="page-loading" class="page-loading" style="display: none;">
    <div class="page-loading-text border-ani">Loading...</div>
</div>
<div id="message-box" class="ehvp-message-box"></div>
<div id="ehvp-nodes-container" class="full-view-grid" tabindex="6"></div>
<div id="big-img-frame" class="big-img-frame big-img-frame-collapse" tabindex="7">
   <a id="img-land-left" class="img-land img-land-left"></a>
   <a id="img-land-right" class="img-land img-land-right"></a>
</div>
<div id="p-helper" class="p-helper">
    <div>
        ${ConfigPanel.html()}
        ${DownloaderPanel.html()}
        ${ChaptersPanel.html()}
        ${FilterPanel.html()}
    </div>
    <div id="b-main" class="b-main">
        <a id="entry-btn" class="b-main-item clickable" data-display-texts="${dt.entry},${dt.collapse}">${dt.entry}</a>
        <div id="page-status" class="b-main-item" hidden>
            <a class="clickable" id="p-curr-page" style="color:#ffc005;">1</a><span id="p-slash-1">/</span><span id="p-total">0</span>
        </div>
        <div id="fin-status" class="b-main-item" hidden>
            <span>${dt.fin}:</span><span id="p-finished">0</span>
        </div>
        <a id="auto-page-btn" class="b-main-item clickable" hidden data-status="paused" data-display-texts="${dt.autoPagePlay},${dt.autoPagePause}">
           <span>${dt.autoPagePlay}</span>
           <div id="auto-page-progress"></div>
        </a>
        <a id="config-panel-btn" class="b-main-item clickable" hidden>${dt.config}</a>
        <a id="downloader-panel-btn" class="b-main-item clickable" hidden>${dt.download}</a>
        <a id="chapters-panel-btn" class="b-main-item clickable" hidden>${dt.chapters}</a>
        <a id="filter-panel-btn" class="b-main-item clickable" hidden>${dt.filter}</a>
        <div id="read-mode-bar" class="b-main-item" hidden>
            <div id="read-mode-select"
            ><a class="b-main-option clickable ${conf.readMode === "pagination" ? "b-main-option-selected" : ""}" data-value="pagination">${dt.pagination}</a
            ><a class="b-main-option clickable ${conf.readMode === "continuous" ? "b-main-option-selected" : ""}" data-value="continuous">${dt.continuous}</a
            ><a class="b-main-option clickable ${conf.readMode === "horizontal" ? "b-main-option-selected" : ""}" data-value="horizontal">${dt.horizontal}</a></div>
        </div>
        <div id="pagination-adjust-bar" class="b-main-item" hidden>
            <span>
              <a id="paginationStepPrev" class="b-main-btn clickable" type="button">&lt;</a>
              <a id="paginationMinusBTN" class="b-main-btn clickable" type="button">-</a>
              <span id="paginationInput" class="b-main-input">${conf.paginationIMGCount}</span>
              <a id="paginationAddBTN" class="b-main-btn clickable" type="button">+</a>
              <a id="paginationStepNext" class="b-main-btn clickable" type="button">&gt;</a>
            </span>
        </div>
        <div id="scale-bar" class="b-main-item" hidden>
            <span>
              <span>${icons.zoomIcon}</span>
              <a id="scaleMinusBTN" class="b-main-btn clickable" type="button">-</a>
              <span id="scaleInput" class="b-main-input" style="width: 3rem; cursor: move;">${conf.imgScale}</span>
              <a id="scaleAddBTN" class="b-main-btn clickable" type="button">+</a>
            </span>
        </div>
    </div>
</div>
`;
    const shadowRoot = base.attachShadow({ mode: "open" });
    const root = document.createElement("div");
    root.classList.add("ehvp-root");
    root.classList.add("ehvp-root-collapse");
    root.innerHTML = HTML_STRINGS;
    const style = document.createElement("style");
    style.innerHTML = styleCSS();
    const styleCustom = document.createElement("style");
    styleCustom.id = "ehvp-style-custom";
    styleCustom.innerHTML = conf.customStyle;
    shadowRoot.append(style);
    root.append(styleCustom);
    shadowRoot.append(root);
    return {
      root,
      fullViewGrid: q("#ehvp-nodes-container", root),
      bigImageFrame: q("#big-img-frame", root),
      pageHelper: q("#p-helper", root),
      configPanelBTN: q("#config-panel-btn", root),
      downloaderPanelBTN: q("#downloader-panel-btn", root),
      chaptersPanelBTN: q("#chapters-panel-btn", root),
      filterPanelBTN: q("#filter-panel-btn", root),
      entryBTN: q("#entry-btn", root),
      currPageElement: q("#p-curr-page", root),
      totalPageElement: q("#p-total", root),
      finishedElement: q("#p-finished", root),
      showGuideElement: q("#show-guide-element", root),
      showKeyboardCustomElement: q("#show-keyboard-custom-element", root),
      showSiteProfilesElement: q("#show-site-profiles-element", root),
      showStyleCustomElement: q("#show-style-custom-element", root),
      showActionCustomElement: q("#show-action-custom-element", root),
      resetConfigElement: q("#reset-config-element", root),
      imgLandLeft: q("#img-land-left", root),
      imgLandRight: q("#img-land-right", root),
      autoPageBTN: q("#auto-page-btn", root),
      pageLoading: q("#page-loading", root),
      messageBox: q("#message-box", root),
      config: new ConfigPanel(root),
      downloader: new DownloaderPanel(root),
      chapters: new ChaptersPanel(root),
      filter: new FilterPanel(root, filter),
      readModeSelect: q("#read-mode-select", root),
      paginationAdjustBar: q("#pagination-adjust-bar", root),
      styleSheet: style.sheet
    };
  }
  function addEventListeners(events, HTML, BIFM, DL, PH) {
    HTML.config.initEvents(events);
    const panelElements = {
      "config": { panel: HTML.config.panel, btn: HTML.configPanelBTN },
      "downloader": { panel: HTML.downloader.panel, btn: HTML.downloaderPanelBTN, cb: () => DL.check() },
      "chapters": { panel: HTML.chapters.panel, btn: HTML.chaptersPanelBTN },
      "filter": { panel: HTML.filter.panel, btn: HTML.filterPanelBTN }
    };
    function collapsePanel(panel) {
      if (conf.autoCollapsePanel && !panel.classList.contains("p-panel-large")) {
        events.collapsePanelEvent(panel, panel.id);
      }
      if (BIFM.visible) {
        HTML.bigImageFrame.focus();
      } else {
        HTML.fullViewGrid.focus();
      }
    }
    Object.entries(panelElements).forEach(([key, elements]) => {
      elements.panel.addEventListener("mouseleave", () => collapsePanel(elements.panel));
      elements.panel.addEventListener("blur", () => collapsePanel(elements.panel));
      elements.btn.addEventListener("click", () => {
        events.togglePanelEvent(key, void 0, elements.btn);
        elements.cb?.();
      });
    });
    let hovering = false;
    HTML.pageHelper.addEventListener("mouseover", () => {
      hovering = true;
      events.abortMouseleavePanelEvent();
      PH.minify(PH.lastStage, true);
    });
    HTML.pageHelper.addEventListener("mouseleave", () => {
      hovering = false;
      Object.values(panelElements).forEach((elements) => collapsePanel(elements.panel));
      setTimeout(() => !hovering && PH.minify(PH.lastStage, false), 700);
    });
    HTML.entryBTN.addEventListener("click", () => {
      let stage = HTML.entryBTN.getAttribute("data-stage") || "exit";
      stage = stage === "open" ? "exit" : "open";
      HTML.entryBTN.setAttribute("data-stage", stage);
      EBUS.emit("toggle-main-view", stage === "open");
    });
    HTML.currPageElement.addEventListener("wheel", (event) => BIFM.stepNext(event.deltaY > 0 ? "next" : "prev", event.deltaY > 0 ? -1 : 1, parseInt(HTML.currPageElement.textContent) - 1));
    document.addEventListener("keydown", (event) => events.keyboardEvent(event));
    document.addEventListener("mouseup", (event) => events.keyboardEvent(event));
    HTML.fullViewGrid.addEventListener("keydown", (event) => {
      events.fullViewGridKeyBoardEvent(event);
      event.stopPropagation();
    });
    HTML.fullViewGrid.addEventListener("mouseup", (event) => {
      events.fullViewGridKeyBoardEvent(event);
      event.stopPropagation();
    });
    HTML.bigImageFrame.addEventListener("keydown", (event) => {
      events.bigImageFrameKeyBoardEvent(event);
      event.stopPropagation();
    });
    HTML.bigImageFrame.addEventListener("mouseup", (event) => {
      events.bigImageFrameKeyBoardEvent(event);
      event.stopPropagation();
    });
    HTML.imgLandLeft.addEventListener("click", (event) => {
      BIFM.stepNext(conf.reversePages ? "next" : "prev");
      event.stopPropagation();
    });
    HTML.imgLandRight.addEventListener("click", (event) => {
      BIFM.stepNext(conf.reversePages ? "prev" : "next");
      event.stopPropagation();
    });
    HTML.showGuideElement.addEventListener("click", events.showGuideEvent);
    HTML.showKeyboardCustomElement.addEventListener("click", events.showKeyboardCustomEvent);
    HTML.showSiteProfilesElement.addEventListener("click", events.showSiteProfilesEvent);
    HTML.showStyleCustomElement.addEventListener("click", events.showStyleCustomEvent);
    HTML.showActionCustomElement.addEventListener("click", events.showActionCustomEvent);
    HTML.resetConfigElement.addEventListener("click", resetConf);
    dragElement(HTML.pageHelper, {
      onFinish: () => {
        conf.pageHelperAbTop = HTML.pageHelper.style.top;
        conf.pageHelperAbLeft = HTML.pageHelper.style.left;
        conf.pageHelperAbBottom = HTML.pageHelper.style.bottom;
        conf.pageHelperAbRight = HTML.pageHelper.style.right;
        saveConf(conf);
      },
      onMoving: (pos) => {
        HTML.pageHelper.style.top = pos.top === void 0 ? "unset" : `${pos.top}px`;
        HTML.pageHelper.style.bottom = pos.bottom === void 0 ? "unset" : `${pos.bottom}px`;
        HTML.pageHelper.style.left = pos.left === void 0 ? "unset" : `${pos.left}px`;
        HTML.pageHelper.style.right = pos.right === void 0 ? "unset" : `${pos.right}px`;
        const rule = queryRule(HTML.styleSheet, ".b-main");
        if (rule) rule.style.flexDirection = pos.left === void 0 ? "row-reverse" : "row";
      }
    }, q("#dragHub", HTML.pageHelper));
    HTML.readModeSelect.addEventListener("click", (event) => {
      const value = event.target.getAttribute("data-value");
      if (value) {
        events.changeReadModeEvent(value);
        PH.minify(PH.lastStage);
      }
    });
    q("#paginationStepPrev", HTML.pageHelper).addEventListener("click", () => BIFM.stepNext(conf.reversePages ? "next" : "prev", conf.reversePages ? -1 : 1));
    q("#paginationStepNext", HTML.pageHelper).addEventListener("click", () => BIFM.stepNext(conf.reversePages ? "prev" : "next", conf.reversePages ? 1 : -1));
    q("#paginationMinusBTN", HTML.pageHelper).addEventListener("click", () => events.modNumberConfigEvent("paginationIMGCount", "minus"));
    q("#paginationAddBTN", HTML.pageHelper).addEventListener("click", () => events.modNumberConfigEvent("paginationIMGCount", "add"));
    q("#paginationInput", HTML.pageHelper).addEventListener("wheel", (event) => events.modNumberConfigEvent("paginationIMGCount", event.deltaY < 0 ? "add" : "minus"));
    q("#scaleInput", HTML.pageHelper).addEventListener("mousedown", (event) => {
      const element = event.target;
      const scale = conf.imgScale || (conf.readMode === "continuous" ? conf.defaultImgScaleModeC : 100);
      dragElementWithLine(event, element, { }, (data) => {
        if (data.distance === 0) return;
        const fix = (data.direction & 3) === 1 ? 1 : -1;
        BIFM.scaleBigImages(1, 0, Math.floor(scale + data.distance * 0.6 * fix));
        element.textContent = conf.imgScale.toString();
      });
    });
    q("#scaleMinusBTN", HTML.pageHelper).addEventListener("click", () => BIFM.scaleBigImages(-1, 10));
    q("#scaleAddBTN", HTML.pageHelper).addEventListener("click", () => BIFM.scaleBigImages(1, 10));
    q("#scaleInput", HTML.pageHelper).addEventListener("wheel", (event) => BIFM.scaleBigImages(event.deltaY > 0 ? -1 : 1, 5));
  }
  function showMessage(box, level, message, duration) {
    message = linkify(message);
    const element = document.createElement("div");
    element.classList.add("ehvp-message");
    element.innerHTML = `<span ${level === "error" ? "style='color: red;'" : ""}>${message}</span><button>X</button><div class="ehvp-message-duration-bar"></div>`;
    box.appendChild(element);
    element.querySelector("button")?.addEventListener("click", () => element.remove());
    const durationBar = element.querySelector("div.ehvp-message-duration-bar");
    if (duration) {
      durationBar.style.animation = `${duration}ms linear main-progress`;
      durationBar.addEventListener("animationend", () => element.remove());
    }
  }

  class PageHelper {
    html;
    chapterIndex = -1;
    pageNumInChapter = [];
    lastStage = "exit";
    chapters;
    downloading;
    constructor(html, chapters, downloading) {
      this.html = html;
      this.chapters = chapters;
      this.downloading = downloading;
      EBUS.subscribe("pf-change-chapter", (index) => {
        let current = 0;
        if (index >= 0) {
          current = this.pageNumInChapter[index] || 0;
        }
        this.chapterIndex = index;
        const [total, finished] = (() => {
          const queue = this.chapters()[index]?.filteredQueue;
          if (!queue) return [0, 0];
          const finished2 = queue.filter((imf) => imf.stage === FetchState.DONE).length;
          return [queue.length, finished2];
        })();
        this.setPageState({ finished: finished.toString(), total: total.toString(), current: (current + 1).toString() });
        this.minify(this.lastStage);
      });
      EBUS.subscribe("bifm-on-show", () => this.minify("bigImageFrame"));
      EBUS.subscribe("bifm-on-hidden", () => this.minify("fullViewGrid"));
      EBUS.subscribe("ifq-do", (index, imf) => {
        if (imf.chapterIndex !== this.chapterIndex) return;
        const queue = this.chapters()[this.chapterIndex]?.filteredQueue;
        if (!queue) return;
        this.pageNumInChapter[this.chapterIndex] = index;
        this.setPageState({ current: (index + 1).toString() });
      });
      EBUS.subscribe("ifq-on-finished-report", (index, queue) => {
        if (queue.chapterIndex !== this.chapterIndex) return;
        this.setPageState({ finished: queue.finishedIndex.size.toString() });
        evLog("info", `No.${index + 1} Finished，Current index at No.${queue.currIndex + 1}`);
      });
      EBUS.subscribe("pf-on-appended", (total, _ifs, chapterIndex, done) => {
        if (this.chapterIndex > -1 && chapterIndex !== this.chapterIndex) return;
        this.setPageState({ total: `${total}${done ? "" : ".."}` });
      });
      html.currPageElement.addEventListener("click", (event) => {
        const ele = event.target;
        const index = parseInt(ele.textContent || "1") - 1;
        if (this.chapterIndex >= 0) {
          const queue = this.chapters()[this.chapterIndex]?.filteredQueue;
          if (!queue || !queue[index]) return;
          EBUS.emit("imf-on-click", queue[index]);
        }
      });
    }
    setPageState({ total, current, finished }) {
      if (total !== void 0) {
        this.html.totalPageElement.textContent = total;
      }
      if (current !== void 0) {
        this.html.currPageElement.textContent = current;
      }
      if (finished !== void 0) {
        this.html.finishedElement.textContent = finished;
      }
    }
    // const arr = ["entry-btn", "auto-page-btn", "page-status", "fin-status", "chapters-panel-btn", "config-panel-btn", "downloader-panel-btn", "scale-bar", "read-mode-bar", "pagination-adjust-bar"];
    minify(stage, hover = false) {
      this.lastStage = stage;
      let level = [0, 0];
      if (stage === "exit") {
        level = [0, 0];
      } else {
        switch (stage) {
          case "fullViewGrid":
            if (conf.minifyPageHelper === "never" || conf.minifyPageHelper === "inBigMode") {
              level = [1, 1];
            } else {
              level = hover ? [1, 1] : [3, 1];
            }
            break;
          case "bigImageFrame":
            if (conf.minifyPageHelper === "never") {
              level = [2, 2];
            } else {
              level = hover ? [2, 2] : [3, 2];
            }
            break;
        }
      }
      function getPick(lvl, downloading = false) {
        switch (lvl) {
          case 0:
            return downloading ? ["entry-btn", "page-status", "fin-status"] : ["entry-btn"];
          case 1:
            return ["page-status", "fin-status", "auto-page-btn", "config-panel-btn", "downloader-panel-btn", "chapters-panel-btn", "filter-panel-btn", "entry-btn"];
          case 2:
            return ["page-status", "fin-status", "auto-page-btn", "config-panel-btn", "downloader-panel-btn", "chapters-panel-btn", "entry-btn", "read-mode-bar", "pagination-adjust-bar", "scale-bar"];
          case 3:
            return ["page-status", "auto-page-btn"];
        }
        return [];
      }
      const filter = (id) => {
        if (id === "chapters-panel-btn") return this.chapters().length > 1;
        if (id === "filter-panel-btn") return conf.enableFilter;
        if (id === "auto-page-btn" && level[0] === 3) return this.html.pageHelper.querySelector("#auto-page-btn")?.getAttribute("data-status") === "playing";
        if (id === "pagination-adjust-bar") return conf.readMode === "pagination";
        return true;
      };
      const pick = getPick(level[0], this.downloading()).filter(filter);
      const notHidden = getPick(level[1], this.downloading()).filter(filter);
      const items = Array.from(this.html.pageHelper.querySelectorAll(".b-main > .b-main-item"));
      for (const item of items) {
        const index = pick.indexOf(item.id);
        item.style.order = index === -1 ? "99" : index.toString();
        item.style.opacity = index === -1 ? "0" : "1";
        item.hidden = !notHidden.includes(item.id);
      }
      const entryBTN = this.html.pageHelper.querySelector("#entry-btn");
      const displayTexts = entryBTN.getAttribute("data-display-texts").split(",");
      entryBTN.textContent = stage === "exit" ? displayTexts[0] : displayTexts[1];
    }
  }

  function onMouse(ele, callback, signal) {
    ele.addEventListener("mousedown", (event) => {
      const { left } = ele.getBoundingClientRect();
      const mouseMove = (event2) => {
        const xInProgress = event2.clientX - left;
        const percent = Math.round(xInProgress / ele.clientWidth * 100);
        callback(percent);
      };
      mouseMove(event);
      ele.addEventListener("mousemove", mouseMove);
      ele.addEventListener("mouseup", () => {
        ele.removeEventListener("mousemove", mouseMove);
      }, { once: true });
      ele.addEventListener("mouseleave", () => {
        ele.removeEventListener("mousemove", mouseMove);
      }, { once: true });
    }, { signal });
  }

  const PLAY_ICON = `<svg width="1.4rem" height="1.4rem" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M106.854 106.002a26.003 26.003 0 0 0-25.64 29.326c16 124 16 117.344 0 241.344a26.003 26.003 0 0 0 35.776 27.332l298-124a26.003 26.003 0 0 0 0-48.008l-298-124a26.003 26.003 0 0 0-10.136-1.994z"/></svg>`;
  const PAUSE_ICON = `<svg width="1.4rem" height="1.4rem" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z"/></svg>`;
  const VOLUME_ICON = `<svg width="1.4rem" height="1.4rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill="#fff" d="M10.0012 8.99984H9.1C8.53995 8.99984 8.25992 8.99984 8.04601 9.10883C7.85785 9.20471 7.70487 9.35769 7.60899 9.54585C7.5 9.75976 7.5 10.0398 7.5 10.5998V13.3998C7.5 13.9599 7.5 14.2399 7.60899 14.4538C7.70487 14.642 7.85785 14.795 8.04601 14.8908C8.25992 14.9998 8.53995 14.9998 9.1 14.9998H10.0012C10.5521 14.9998 10.8276 14.9998 11.0829 15.0685C11.309 15.1294 11.5228 15.2295 11.7143 15.3643C11.9305 15.5164 12.1068 15.728 12.4595 16.1512L15.0854 19.3023C15.5211 19.8252 15.739 20.0866 15.9292 20.1138C16.094 20.1373 16.2597 20.0774 16.3712 19.9538C16.5 19.811 16.5 19.4708 16.5 18.7902V5.20948C16.5 4.52892 16.5 4.18864 16.3712 4.04592C16.2597 3.92233 16.094 3.86234 15.9292 3.8859C15.7389 3.9131 15.5211 4.17451 15.0854 4.69733L12.4595 7.84843C12.1068 8.27166 11.9305 8.48328 11.7143 8.63542C11.5228 8.77021 11.309 8.87032 11.0829 8.93116C10.8276 8.99984 10.5521 8.99984 10.0012 8.99984Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const MUTED_ICON = `<svg width="1.4rem" height="1.4rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M16 9.50009L21 14.5001M21 9.50009L16 14.5001M4.6 9.00009H5.5012C6.05213 9.00009 6.32759 9.00009 6.58285 8.93141C6.80903 8.87056 7.02275 8.77046 7.21429 8.63566C7.43047 8.48353 7.60681 8.27191 7.95951 7.84868L10.5854 4.69758C11.0211 4.17476 11.2389 3.91335 11.4292 3.88614C11.594 3.86258 11.7597 3.92258 11.8712 4.04617C12 4.18889 12 4.52917 12 5.20973V18.7904C12 19.471 12 19.8113 11.8712 19.954C11.7597 20.0776 11.594 20.1376 11.4292 20.114C11.239 20.0868 11.0211 19.8254 10.5854 19.3026L7.95951 16.1515C7.60681 15.7283 7.43047 15.5166 7.21429 15.3645C7.02275 15.2297 6.80903 15.1296 6.58285 15.0688C6.32759 15.0001 6.05213 15.0001 5.5012 15.0001H4.6C4.03995 15.0001 3.75992 15.0001 3.54601 14.8911C3.35785 14.7952 3.20487 14.6422 3.10899 14.4541C3 14.2402 3 13.9601 3 13.4001V10.6001C3 10.04 3 9.76001 3.10899 9.54609C3.20487 9.35793 3.35785 9.20495 3.54601 9.10908C3.75992 9.00009 4.03995 9.00009 4.6 9.00009Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  class VideoControl {
    ui;
    paused = false;
    abort;
    elementID;
    root;
    constructor(root) {
      this.root = root;
      this.ui = this.create(this.root);
      this.flushUI();
    }
    show() {
      this.ui.root.hidden = false;
    }
    hidden() {
      this.ui.root.hidden = true;
    }
    create(root) {
      const ui = document.createElement("div");
      ui.classList.add("bifm-vid-ctl");
      ui.innerHTML = `
<div>
  <button id="bifm-vid-ctl-play" class="bifm-vid-ctl-btn">${PLAY_ICON}</button>
  <button id="bifm-vid-ctl-mute" class="bifm-vid-ctl-btn">${MUTED_ICON}</button>
    <div id="bifm-vid-ctl-volume" class="bifm-vid-ctl-pg">
      <div class="bifm-vid-ctl-pg-inner" style="width: 30%"></div>
    </div>
  <span id="bifm-vid-ctl-time" class="bifm-vid-ctl-span">00:00</span>
  <span class="bifm-vid-ctl-span">/</span>
  <span id="bifm-vid-ctl-duration" class="bifm-vid-ctl-span">10:00</span>
  <!-- <span id = "bifm-vid-ctl-drag" class="bifm-vid-ctl-span" style = "cursor: grab;">✠</span> -->
</div>
<div>
    <div id="bifm-vid-ctl-pg" class="bifm-vid-ctl-pg">
      <div class="bifm-vid-ctl-pg-inner" style="width: 30%"></div>
    </div>
</div>
`;
      root.appendChild(ui);
      return {
        root: ui,
        playBTN: q("#bifm-vid-ctl-play", ui),
        volumeBTN: q("#bifm-vid-ctl-mute", ui),
        volumeProgress: q("#bifm-vid-ctl-volume", ui),
        progress: q("#bifm-vid-ctl-pg", ui),
        time: q("#bifm-vid-ctl-time", ui),
        duration: q("#bifm-vid-ctl-duration", ui)
      };
    }
    flushUI(state, onlyState) {
      const { value, max } = state ? { value: state.time, max: state.duration } : { value: 0, max: 10 };
      const percent = value / max * 100;
      this.ui.progress.firstElementChild.style.width = `${percent}%`;
      this.ui.time.textContent = secondsToTime(value);
      this.ui.duration.textContent = secondsToTime(max);
      if (onlyState) return;
      this.ui.playBTN.innerHTML = this.paused ? PLAY_ICON : PAUSE_ICON;
      this.ui.volumeBTN.innerHTML = conf.muted ? MUTED_ICON : VOLUME_ICON;
      this.ui.volumeProgress.firstElementChild.style.width = `${conf.volume || 30}%`;
    }
    attach(element) {
      this.detach();
      this.show();
      this.abort = new AbortController();
      const state = { time: element.currentTime, duration: element.duration };
      this.flushUI(state);
      element.addEventListener("timeupdate", (event) => {
        const ele = event.target;
        if (!state) return;
        state.time = ele.currentTime;
        this.flushUI(state, true);
      }, { signal: this.abort.signal });
      element.onwaiting = () => evLog("debug", "onwaiting");
      element.onended = () => {
        element.currentTime = 0;
        element.play();
      };
      element.muted = conf.muted || false;
      element.volume = Math.min(1, (conf.volume || 30) / 100);
      if (!this.paused) {
        element.play();
      }
      this.elementID = element.id;
      if (!this.elementID) {
        this.elementID = "vid-" + Math.random().toString(36).slice(2);
        element.id = this.elementID;
      }
      this.ui.playBTN.addEventListener("click", () => {
        const vid = this.getVideoElement();
        if (!vid) return;
        this.paused = !this.paused;
        if (this.paused) {
          vid.pause();
        } else {
          vid.play();
        }
        this.flushUI(state);
      }, { signal: this.abort.signal });
      this.ui.volumeBTN.addEventListener("click", () => {
        const vid = this.getVideoElement();
        if (!vid) return;
        conf.muted = !conf.muted;
        vid.muted = conf.muted;
        saveConf(conf);
        this.flushUI(state);
      }, { signal: this.abort.signal });
      onMouse(this.ui.progress, (percent) => {
        const vid = this.getVideoElement();
        if (!vid) return;
        vid.currentTime = vid.duration * (percent / 100);
        state.time = vid.currentTime;
        this.flushUI(state);
      }, this.abort.signal);
      onMouse(this.ui.volumeProgress, (percent) => {
        const vid = this.getVideoElement();
        if (!vid) return;
        conf.volume = Math.min(100, percent);
        saveConf(conf);
        vid.volume = Math.min(1, conf.volume / 100);
        this.flushUI(state);
      }, this.abort.signal);
    }
    detach() {
      const vid = this.getVideoElement();
      if (vid) vid.pause();
      this.elementID = void 0;
      this.abort?.abort();
      this.abort = void 0;
      this.flushUI();
      this.hidden();
    }
    getVideoElement() {
      return this.root.querySelector(`#${this.elementID}`);
    }
  }
  function secondsToTime(seconds) {
    const min = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }

  class Scroller {
    element;
    scrolling = false;
    step;
    // [1, 100]
    distance = 0;
    additional = 0;
    lastDirection;
    directionChanged = false;
    scrollMargin;
    maxScrollMargin;
    setScrollMargin;
    constructor(element, step, mode) {
      this.element = element;
      this.step = step || 1;
      if (mode && mode === "x") {
        this.scrollMargin = () => this.element.scrollLeft;
        this.maxScrollMargin = () => this.element.scrollWidth - this.element.clientWidth;
        this.setScrollMargin = (margin) => this.element.scrollLeft = margin;
      } else {
        this.scrollMargin = () => this.element.scrollTop;
        this.maxScrollMargin = () => this.element.scrollHeight - this.element.clientHeight;
        this.setScrollMargin = (margin) => this.element.scrollTop = margin;
      }
    }
    scroll(delta, step) {
      if (step) this.step = step;
      let resolve;
      const promise = new Promise((r) => resolve = r);
      this.distance = Math.abs(delta);
      const direction = delta < 0 ? "up" : "down";
      this.directionChanged = this.lastDirection !== void 0 && this.lastDirection !== direction;
      if (this.scrolling || this.distance <= 0) {
        return promise;
      }
      const sign = delta / this.distance;
      this.lastDirection = direction;
      this.additional = 0;
      this.scrolling = true;
      const scrolled = () => {
        this.scrolling = false;
        this.directionChanged = false;
        this.lastDirection = void 0;
        this.distance = 0;
        resolve?.();
      };
      const doFrame = () => {
        if (!this.scrolling) return scrolled();
        this.distance -= this.step + this.additional;
        let scrollMargin = this.scrollMargin() + (this.step + this.additional) * sign;
        scrollMargin = Math.max(scrollMargin, 0);
        scrollMargin = Math.min(scrollMargin, this.maxScrollMargin());
        this.setScrollMargin(scrollMargin);
        if (this.distance <= 0 || this.directionChanged || scrollMargin === 0 || scrollMargin === this.maxScrollMargin()) return scrolled();
        window.requestAnimationFrame(doFrame);
      };
      window.requestAnimationFrame(doFrame);
      return promise;
    }
  }

  class TouchPoint {
    id;
    x;
    y;
    constructor(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
    }
    static from(tp) {
      return new TouchPoint(tp.identifier, tp.clientX, tp.clientY);
    }
    distance(other) {
      return calculateDistance({ x: this.x, y: this.y }, { x: other.x, y: other.y });
    }
    direction(other) {
      const x = this.x - other.x;
      const y = this.y - other.y;
      const absX = Math.abs(x);
      const absY = Math.abs(y);
      if (absX > absY) {
        return x > 0 ? "L" : "R";
      } else {
        return y > 0 ? "U" : "D";
      }
    }
  }
  class TouchManager {
    element;
    trail = {};
    handlers;
    constructor(element, handles) {
      this.element = element;
      this.handlers = handles;
      this.element.addEventListener("touchstart", (ev) => this.start(ev));
      this.element.addEventListener("touchmove", (ev) => this.move(ev));
      this.element.addEventListener("touchend", (ev) => this.end(ev));
    }
    start(ev) {
      const tps = Array.from(ev.targetTouches).map(TouchPoint.from);
      this.trail = tps.reduce((prev, curr) => {
        prev[curr.id] = [curr];
        return prev;
      }, {});
      let distance = 0;
      if (tps.length === 2) {
        distance = tps[0].distance(tps[1]);
      }
      this.handlers.start?.(distance, ev);
    }
    move(ev) {
      const tps = Array.from(ev.targetTouches).map(TouchPoint.from);
      tps.forEach((tp) => {
        const trail = this.trail[tp.id];
        const last = trail[trail.length - 1];
        const distance = last.distance(tp);
        if (distance > 30) {
          trail.push(tp);
        }
      });
      if (Object.keys(this.trail).length === 2 && tps.length === 2) {
        const tp1 = tps[0];
        const tp2 = tps[1];
        this.handlers.zoom?.(tp1.distance(tp2), ev);
        return;
      }
    }
    end(ev) {
      const tpKeys = Object.keys(this.trail).map(Number);
      if (tpKeys.length === 1) {
        if (this.trail[tpKeys[0]].length > 1) {
          const trail = this.trail[tpKeys[0]];
          let direction = void 0;
          for (let i = 0, j = 1; j < trail.length; i++, j++) {
            if (!direction) {
              direction = trail[i].direction(trail[j]);
            } else {
              if (trail[i].direction(trail[j]) !== direction) return;
            }
          }
          this.handlers.swipe?.(direction, ev);
        }
      }
      if (tpKeys.length === 2) {
        const trail1 = this.trail[tpKeys[0]];
        const trail2 = this.trail[tpKeys[1]];
        if (trail1.length > 1 && trail2.length > 1) {
          const line1 = [trail1[0], trail1[trail1.length - 1]];
          const line2 = [trail2[0], trail2[trail2.length - 1]];
          const { angle, clockwise } = calculateAngle(line1, line2);
          this.handlers.rotate?.(clockwise, angle, ev);
        }
      }
      this.trail = {};
      this.handlers.end?.(ev);
    }
  }
  function calculateDistance(start, end) {
    const dx = start.x - end.x;
    const dy = start.y - end.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function calculateAngle(line1, line2) {
    if (line1.length !== 2 || line2.length !== 2) throw new Error("line1 or line2 length must be 2");
    [line1, line2].forEach(([start, end]) => {
      if (start.x === end.x && start.y === end.y) throw new Error(`start at ${start.toString()}, end at ${end.toString()}, not line`);
    });
    const vector1 = { x: line1[1].x - line1[0].x, y: line1[1].y - line1[0].y };
    const vector2 = { x: line2[1].x - line2[0].x, y: line2[1].y - line2[0].y };
    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
    const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
    const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);
    const cosTheta = dotProduct / (magnitude1 * magnitude2);
    const angleInRadians = Math.acos(cosTheta);
    const crossProduct = vector1.x * vector2.y - vector1.y * vector2.x;
    const clockwise = crossProduct <= 0;
    const angle = angleInRadians * (180 / Math.PI);
    return { angle, clockwise };
  }

  class BigImageFrameManager {
    root;
    container;
    observer;
    intersectingElements = [];
    renderingElements = [];
    currentIndex = 0;
    preventStep = { currentPreventFinished: false };
    debouncer;
    callbackOnWheel;
    visible = false;
    html;
    vidController;
    chapterIndex = 0;
    getChapter;
    loadingHelper;
    currLoadingState = /* @__PURE__ */ new Map();
    scrollerY;
    scrollerX;
    lastMouse;
    pageNumInChapter = [];
    oriented = "next";
    // When bifm opens an image, the IntersectionObserver will immediately start detecting and rendering after 50 milliseconds, 
    // but we want to only start rendering when the corresponding image index is detected.
    intersectingIndexLock = false;
    constructor(HTML, getChapter) {
      this.html = HTML;
      this.root = HTML.bigImageFrame;
      this.debouncer = new Debouncer();
      this.getChapter = getChapter;
      this.scrollerY = new Scroller(this.root);
      this.scrollerX = new Scroller(this.root, void 0, "x");
      this.container = document.createElement("div");
      this.container.classList.add("bifm-container");
      switch (conf.readMode) {
        case "continuous":
          this.container.classList.add("bifm-container-vert");
          break;
        case "pagination":
          this.container.classList.add("bifm-container-page");
          break;
        case "horizontal":
          this.container.classList.add("bifm-container-hori");
          break;
      }
      this.observer = new IntersectionObserver((entries) => this.intersecting(entries), { root: this.root });
      this.root.appendChild(this.container);
      this.initEvent();
      EBUS.subscribe("pf-on-appended", (_total, nodes, chapterIndex) => {
        if (chapterIndex !== this.chapterIndex) return;
        this.append(nodes);
      });
      EBUS.subscribe("pf-change-chapter", (index) => {
        this.chapterIndex = Math.max(0, index);
        this.container.innerHTML = "";
      });
      EBUS.subscribe("imf-on-click", (imf) => this.show(imf));
      EBUS.subscribe("imf-on-finished", (index, success, imf) => {
        if (imf.chapterIndex !== this.chapterIndex) return;
        this.currLoadingState.delete(index);
        this.debouncer.addEvent("FLUSH-LOADING-HELPER", () => this.flushLoadingHelper(), 20);
        if (!success) return;
        const current = this.renderingElements.find((element) => parseIndex(element) === index);
        if (!current) return;
        current.innerHTML = "";
        current.appendChild(this.newMediaNode(imf));
      });
      EBUS.subscribe("imf-resize", (imf) => {
        if (imf.chapterIndex !== this.chapterIndex) return;
        this.onResize(imf);
      });
      EBUS.subscribe("bifm-rotate-image", () => this.rotate(true));
      this.loadingHelper = document.createElement("span");
      this.loadingHelper.id = "bifm-loading-helper";
      this.root.appendChild(this.loadingHelper);
      EBUS.subscribe("imf-download-state-change", (imf) => {
        if (imf.chapterIndex !== this.chapterIndex) return;
        const [start, end] = [this.currentIndex, this.currentIndex + (conf.readMode !== "pagination" ? 1 : conf.paginationIMGCount)];
        if (imf.index < start || imf.index >= end) return;
        this.currLoadingState.set(imf.index, Math.floor(imf.downloadState.loaded / imf.downloadState.total * 100));
        this.debouncer.addEvent("FLUSH-LOADING-HELPER", () => this.flushLoadingHelper(), 20);
      });
      new AutoPage(this, HTML.autoPageBTN);
    }
    onResize(imf) {
      const element = this.container.querySelector(`div[d-index="${imf.index}"]`);
      const current = this.container.querySelector(`div[d-index="${this.currentIndex}"]`);
      if (!element || !current) return;
      if (conf.readMode === "continuous") {
        const currOffsetTop = current.offsetTop;
        const currScrollTop = this.root.scrollTop;
        element.style.aspectRatio = imf.ratio().toString();
        if (currOffsetTop !== current.offsetTop) {
          this.root.scrollTop = current.offsetTop + (currOffsetTop - currScrollTop);
        }
      } else {
        const currOffsetLeft = current.offsetLeft;
        const currScrollLeft = this.root.scrollLeft;
        element.style.aspectRatio = imf.ratio().toString();
        if (conf.readMode === "pagination" && imf.index === this.currentIndex) {
          this.jumpTo(this.currentIndex);
        } else if (currOffsetLeft !== current.offsetLeft) {
          this.root.scrollLeft = current.offsetLeft - (currOffsetLeft - currScrollLeft);
        }
      }
    }
    intersecting(entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const element = entry.target;
          const index = parseIndex(element);
          if (index === -1) continue;
          this.intersectingElements.push(element);
        } else {
          const index = this.intersectingElements.indexOf(entry.target);
          if (index > -1) this.intersectingElements.splice(index, 1);
        }
      }
      if (this.intersectingIndexLock) {
        const hasCurrentIndex = this.intersectingElements.find((elem) => this.currentIndex === parseIndex(elem));
        if (hasCurrentIndex) {
          this.intersectingIndexLock = false;
        } else {
          return;
        }
      }
      this.debouncer.addEvent("rendering-images", () => this.rendering(), 50);
    }
    rendering() {
      const sorting = this.intersectingElements.map((elem) => ({ index: parseIndex(elem), elem }));
      sorting.filter((e) => e.index > -1).sort((a, b) => a.index - b.index);
      if (conf.reversePages) sorting.reverse();
      const intersecting = sorting.map((e) => e.elem);
      if (intersecting.length === 0) return;
      let sibling = intersecting[0];
      let [count, limit] = [0, conf.paginationIMGCount];
      while ((sibling = sibling.previousElementSibling) && count < limit) {
        intersecting.unshift(sibling);
        count++;
      }
      sibling = intersecting[intersecting.length - 1];
      count = 0;
      while ((sibling = sibling.nextElementSibling) && count < limit) {
        intersecting.push(sibling);
        count++;
      }
      const unrender = [];
      const rendered = [];
      for (const elem of this.renderingElements) {
        if (intersecting.includes(elem)) {
          rendered.push(elem);
        } else {
          unrender.push(elem);
        }
      }
      unrender.forEach((ele) => ele.innerHTML = "");
      for (const elem of intersecting) {
        if (!rendered.includes(elem)) {
          elem.innerHTML = "";
          const imf = this.getIMF(elem);
          if (imf) {
            elem.appendChild(this.newMediaNode(imf));
          }
        }
      }
      this.renderingElements = intersecting;
    }
    getIMF(element) {
      const index = parseIndex(element);
      if (index === -1 || isNaN(index)) return null;
      const queue = this.getChapter(this.chapterIndex).filteredQueue;
      return queue[index] ?? null;
    }
    initEvent() {
      this.root.addEventListener("wheel", (event) => this.onWheel(
        new WheelEvent("wheel", {
          deltaY: conf.scrollingDelta * (event.deltaY < 0 ? -1 : 1),
          buttons: event.buttons,
          button: event.button
        }),
        void 0,
        void 0,
        void 0,
        event
      ));
      this.root.addEventListener("scroll", (event) => this.onScroll(event), { passive: false });
      this.root.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
      this.root.addEventListener("mousedown", (mdevt) => {
        if (mdevt.button !== 0) return;
        if (mdevt.target.classList.contains("img-land")) return;
        let moved = false;
        const start = { x: mdevt.clientX, y: mdevt.clientY };
        let last = { x: mdevt.clientX, y: mdevt.clientY };
        let elementsWidth = void 0;
        const abort = new AbortController();
        const [scrollTop, scrollLeft] = [this.root.scrollTop, this.root.scrollLeft];
        this.root.addEventListener("mouseup", (muevt) => {
          abort.abort();
          if (!moved) {
            this.hidden(muevt);
          } else if (conf.magnifier && conf.imgScale === 100) {
            this.scaleBigImages(1, 0, conf.imgScale, false);
            [this.root.scrollTop, this.root.scrollLeft] = [scrollTop, scrollLeft];
          }
          moved = false;
        }, { once: true });
        this.root.addEventListener("mousemove", (mmevt) => {
          if (conf.dragImageOut) {
            moved = true;
            return;
          }
          if (IS_MOBILE) return;
          if (!moved) {
            const dist = calculateDistance(start, { x: mmevt.clientX, y: mmevt.clientY });
            if (dist < 20) return;
            if (conf.magnifier && conf.imgScale === 100) {
              this.scaleBigImages(1, 0, 150, false);
            }
            if (conf.readMode === "pagination") {
              const showing = this.intersectingElements;
              if (showing.length > 0) {
                elementsWidth = showing[showing.length - 1].offsetLeft + showing[showing.length - 1].offsetWidth - showing[0].offsetLeft;
              }
            }
          }
          moved = true;
          this.debouncer.addEvent("BIG-IMG-MOUSE-MOVE", () => {
            stickyMouse(this.root, mmevt, last, elementsWidth);
            last = { x: mmevt.clientX, y: mmevt.clientY };
          }, 5);
        }, { signal: abort.signal });
      });
      new TouchManager(this.root, {
        start: () => {
          if (conf.readMode === "pagination") {
            this.root.style.overflow = "hidden";
          }
        },
        swipe: (direction) => {
          if (conf.readMode === "continuous" || conf.readMode === "horizontal") return;
          this.oriented = (() => {
            switch (direction) {
              case "L":
                return conf.reversePages ? "next" : "prev";
              case "R":
                return conf.reversePages ? "prev" : "next";
              case "U":
                return "next";
              case "D":
                return "prev";
            }
          })();
          this.stepNext(this.oriented);
          if (conf.readMode === "pagination") {
            this.root.style.overflow = "";
          }
        },
        rotate: (_clockwise, _angle) => {
        }
      });
    }
    cherryPickCurrent(exclude) {
      EBUS.emit("add-cherry-pick-range", this.chapterIndex, this.currentIndex, !exclude, false);
      const withRange = conf.readMode === "pagination" && conf.paginationIMGCount > 1;
      const end = this.currentIndex + conf.paginationIMGCount - 1;
      if (withRange) {
        EBUS.emit("add-cherry-pick-range", this.chapterIndex, end, !exclude, true);
      }
      const message = `${exclude ? "Excluded" : "Selected"} Image${withRange ? "s" : ""} no.${this.currentIndex + 1}${withRange ? "-" + (end + 1) : ""}`;
      EBUS.emit("notify-message", "info", message, 1e3);
    }
    rotate(clockwise) {
      const cls = ["bifm-rotate-90", "bifm-rotate-180", "bifm-rotate-270", ""];
      if (!clockwise) cls.reverse();
      let idx = cls.findIndex((c) => this.root.classList.contains(c));
      if (idx === -1) {
        idx = clockwise ? 3 : 0;
      } else {
        this.root.classList.remove(cls[idx]);
      }
      const add = (idx + 1) % 4;
      if (cls[add] !== "") this.root.classList.add(cls[add]);
    }
    scrollStop() {
      this.scrollerY.scrolling = false;
      this.scrollerX.scrolling = false;
    }
    hidden(event) {
      if (event && event.target && event.target.tagName === "SPAN") return;
      this.visible = false;
      EBUS.emit("bifm-on-hidden");
      this.html.fullViewGrid.focus();
      this.vidController?.detach();
      this.root.classList.add("big-img-frame-collapse");
      this.renderingElements.forEach((elem) => elem.innerHTML = "");
      this.renderingElements = [];
      this.intersectingIndexLock = false;
    }
    show(imf) {
      this.visible = true;
      this.currentIndex = imf.index;
      this.intersectingIndexLock = true;
      this.root.classList.remove("big-img-frame-collapse");
      this.root.focus();
      this.debouncer.addEvent("TOGGLE-CHILDREN-D", () => imf.chapterIndex === this.chapterIndex && this.setNow(imf), 100);
      EBUS.emit("bifm-on-show");
    }
    setNow(imf) {
      this.currentIndex = imf.index;
      this.pageNumInChapter[this.chapterIndex] = imf.index;
      if (this.visible) {
        this.jumpTo(imf.index);
      }
      EBUS.emit("ifq-do", imf.index, imf, this.oriented ?? "next");
      this.lastMouse = void 0;
      this.currLoadingState.clear();
      this.flushLoadingHelper();
    }
    append(nodes) {
      if (conf.readMode === "pagination") return;
      const elements = [];
      const scrollWidth = this.root.scrollWidth;
      for (const node of nodes) {
        const div = document.createElement("div");
        div.style.aspectRatio = node.ratio().toString();
        div.setAttribute("d-index", node.index.toString());
        elements.push(div);
        this.observer.observe(div);
      }
      const reverse = conf.readMode !== "continuous" && conf.reversePages;
      if (this.container.childElementCount === 0) {
        const paddingRatio = window.innerWidth / window.innerHeight;
        const start = document.createElement("div");
        start.style.aspectRatio = paddingRatio.toString();
        start.setAttribute("d-index", "-1");
        elements.unshift(start);
        const end = document.createElement("div");
        end.style.aspectRatio = paddingRatio.toString();
        end.setAttribute("d-index", "-1");
        elements.push(end);
      } else {
        elements.push(reverse ? this.container.firstElementChild : this.container.lastElementChild);
      }
      if (reverse) {
        elements.reverse();
        this.container.prepend(...elements);
        this.root.scrollLeft = this.root.scrollLeft + this.root.scrollWidth - scrollWidth;
      } else {
        this.container.append(...elements);
      }
    }
    changeLayout() {
      this.resetScaleBigImages(true);
      switch (conf.readMode) {
        case "continuous":
          this.container.classList.remove("bifm-container-hori", "bifm-container-vert", "bifm-container-page");
          this.container.classList.add("bifm-container-vert");
          break;
        case "pagination":
          this.container.classList.remove("bifm-container-hori", "bifm-container-vert", "bifm-container-page");
          this.container.classList.add("bifm-container-page");
          break;
        case "horizontal":
          this.container.classList.remove("bifm-container-hori", "bifm-container-vert", "bifm-container-page");
          this.container.classList.add("bifm-container-hori");
          break;
      }
      this.container.innerHTML = "";
      this.intersectingElements = [];
      this.renderingElements = [];
      const queue = this.getChapter(this.chapterIndex).filteredQueue;
      this.append(queue);
      this.jumpTo(this.currentIndex);
    }
    jumpTo(index) {
      switch (conf.readMode) {
        case "pagination": {
          const showing = this.setElements();
          if (this.container.offsetWidth > this.root.offsetWidth) {
            if (conf.reversePages) {
              this.root.scrollLeft = this.container.offsetWidth - this.root.offsetWidth;
            } else {
              this.root.scrollLeft = 0;
            }
          }
          this.root.scrollTop = 0;
          if (showing[0].firstElementChild) {
            this.tryPlayVideo(showing[0].firstElementChild);
          }
          break;
        }
        case "horizontal": {
          const element = this.container.querySelector(`div[d-index="${index}"]`);
          if (!element) return;
          if (conf.reversePages) {
            this.root.scrollLeft = element.offsetLeft - this.root.offsetWidth + element.offsetWidth;
          } else {
            this.root.scrollLeft = element.offsetLeft;
          }
          break;
        }
        case "continuous": {
          const element = this.container.querySelector(`div[d-index="${index}"]`);
          if (!element) return;
          const rootH = this.root.offsetHeight;
          const height = element.offsetHeight;
          let marginT = index === 0 ? 0 : Math.floor((rootH - height) / 2);
          marginT = Math.max(0, marginT);
          this.root.scrollTop = element.offsetTop - marginT;
          break;
        }
      }
    }
    stepNext(oriented, fixStep = 0, current) {
      this.oriented = oriented;
      let index = current || this.currentIndex;
      if (index === void 0 || isNaN(index)) return;
      const queue = this.getChapter(this.chapterIndex)?.filteredQueue;
      if (!queue || queue.length === 0) return;
      index = oriented === "next" ? index + conf.paginationIMGCount : index - conf.paginationIMGCount;
      if (conf.paginationIMGCount > 1) {
        index += fixStep;
      }
      if (index < -conf.paginationIMGCount) {
        index = queue.length - 1;
      } else {
        index = Math.max(0, index);
      }
      if (!queue[index]) return;
      this.resetPreventStep();
      this.setNow(queue[index]);
    }
    checkCurrent() {
      const rootRect = this.root.getBoundingClientRect();
      const isCenter = (() => {
        if (conf.readMode === "continuous") {
          return (rect, rootRect2) => rect.top <= rootRect2.height / 2 && rect.bottom >= rootRect2.height / 2;
        } else {
          return (rect, rootRect2) => rect.left <= rootRect2.width / 2 && rect.right >= rootRect2.width / 2;
        }
      })();
      for (const element of this.intersectingElements) {
        const rect = element.getBoundingClientRect();
        if (isCenter(rect, rootRect)) {
          const imf = this.getIMF(element);
          if (imf === null) continue;
          if (imf.index === this.currentIndex) continue;
          EBUS.emit("ifq-do", imf.index, imf, this.oriented);
          this.currentIndex = imf.index;
          this.pageNumInChapter[this.chapterIndex] = imf.index;
          if (element.firstElementChild) {
            this.tryPlayVideo(element.firstElementChild);
          }
          break;
        }
      }
    }
    // limit scrollTop or scrollLeft
    onScroll(_event) {
      switch (conf.readMode) {
        case "continuous": {
          const [first, last] = [
            this.container.children.item(1),
            this.container.children.item(this.container.children.length - 2)
          ];
          let offsetTop = first.offsetTop ?? 0;
          if (this.root.scrollTop < offsetTop - 3) {
            this.root.scrollTop = offsetTop - 2;
          } else {
            offsetTop = last ? last.offsetTop + last.offsetHeight - this.root.offsetHeight : this.root.scrollHeight;
            if (this.root.scrollTop > offsetTop + 3) {
              this.root.scrollTop = offsetTop + 2;
            }
          }
          break;
        }
        case "pagination": {
          break;
        }
        case "horizontal": {
          const [first, last] = [
            this.container.children.item(1),
            this.container.children.item(this.container.children.length - 2)
          ];
          let offsetLeft = first?.offsetLeft ?? 0;
          if (this.root.scrollLeft < offsetLeft - 3) {
            this.root.scrollLeft = offsetLeft - 2;
          } else {
            offsetLeft = last ? last.offsetLeft + last.offsetWidth - this.root.offsetWidth : this.root.scrollWidth;
            if (this.root.scrollLeft > offsetLeft + 3) {
              this.root.scrollLeft = offsetLeft + 2;
            }
          }
          break;
        }
      }
      if (conf.readMode !== "pagination") {
        this.debouncer.addEvent("bifm-on-wheel", () => this.checkCurrent(), 69);
      }
    }
    onWheel(event, noPrevent, customScrolling, noCallback, originEvent) {
      const preventDefault = () => {
        event.preventDefault();
        originEvent?.preventDefault();
      };
      if (!noCallback) this.callbackOnWheel?.();
      if (event.buttons === 2) {
        preventDefault();
        this.scaleBigImages(event.deltaY > 0 ? -1 : 1, 5);
        return;
      }
      const [o, negative] = event.deltaY > 0 ? ["next", "prev"] : ["prev", "next"];
      this.oriented = o;
      switch (conf.readMode) {
        case "pagination": {
          const over = this.checkOverflow();
          const [$ori, $neg] = conf.reversePages ? [negative, this.oriented] : [this.oriented, negative];
          const rotated = this.root.classList.contains("bifm-rotate-90") || this.root.classList.contains("bifm-rotate-270");
          if (rotated) {
            this.stepNext(this.oriented);
            break;
          }
          if (over[this.oriented].overY - 1 <= 0 && over[$ori].overX - 1 <= 0) {
            preventDefault();
            if (!noPrevent) {
              if (over[$neg].overX > 0 || over[negative].overY > 0) {
                if (this.tryPreventStep()) break;
              }
            }
            this.stepNext(this.oriented);
            break;
          }
          let fix = this.oriented === "next" ? 1 : -1;
          if (customScrolling && over[this.oriented].overY > 0) {
            this.scrollerY.scroll(Math.min(over[this.oriented].overY, Math.abs(event.deltaY * 3)) * fix, Math.abs(Math.ceil(event.deltaY / 4)));
          }
          fix = fix * (conf.reversePages ? -1 : 1);
          if (over[this.oriented].overY - 1 <= 0 && over[$ori].overX > 0) {
            this.scrollerX.scroll(Math.min(over[$ori].overX, Math.abs(event.deltaY * 3)) * fix, Math.abs(Math.ceil(event.deltaY / 4)));
          }
          break;
        }
        case "horizontal": {
          preventDefault();
          this.scrollerX.scroll(event.deltaY * (conf.reversePages ? -1 : 1), conf.scrollingSpeed);
          break;
        }
        case "continuous": {
          if (customScrolling) {
            this.scrollerY.scroll(event.deltaY, conf.scrollingSpeed);
          }
          break;
        }
      }
    }
    resetPreventStep(fin) {
      this.preventStep.ani?.cancel();
      this.preventStep.ele?.remove();
      this.preventStep = { currentPreventFinished: fin ?? false };
    }
    // prevent scroll to next page while mouse scrolling;
    tryPreventStep() {
      if (conf.preventScrollPageTime === 0) return false;
      if (this.preventStep.currentPreventFinished) {
        this.resetPreventStep();
        return false;
      } else {
        if (!this.preventStep.ele) {
          const lockEle = document.createElement("div");
          lockEle.style.width = "100vw";
          lockEle.style.position = "fixed";
          lockEle.style.display = "flex";
          lockEle.style.justifyContent = "center";
          lockEle.style.bottom = "0px";
          lockEle.innerHTML = `<div style="width: 30vw;height: 0.1rem;background-color: #1b00ff59;text-align: center;font-size: 0.8rem;position: relative;font-weight: 800;color: gray;border-radius: 7px;border: 1px solid #510000;"><span style="position: absolute;bottom: -3px;"></span></div>`;
          this.root.appendChild(lockEle);
          this.preventStep.ele = lockEle;
          if (conf.preventScrollPageTime > 0) {
            const ani = lockEle.children[0].animate([{ width: "30vw" }, { width: "0vw" }], { duration: conf.preventScrollPageTime });
            ani.onfinish = () => this.preventStep.ele && this.resetPreventStep(true);
            this.preventStep.ani = ani;
          }
          this.preventStep.currentPreventFinished = false;
        }
        return true;
      }
    }
    checkOverflow() {
      const showing = Array.from(this.container.querySelectorAll("div:not(.bifm-node-hide)"));
      if (showing.length === 0) return { "prev": { overX: 0, overY: 0 }, "next": { overX: 0, overY: 0 }, elements: [] };
      const leftFix = this.root.getBoundingClientRect().left;
      const rectL = showing[0].getBoundingClientRect();
      const rectR = showing[showing.length - 1].getBoundingClientRect();
      return {
        "prev": {
          overX: Math.round(rectL.left) * -1 + leftFix,
          overY: Math.round(rectL.top) * -1
        },
        "next": {
          overX: Math.round(rectR.right) - this.root.offsetWidth,
          overY: Math.round(rectL.bottom) - this.root.offsetHeight
        },
        elements: showing
      };
    }
    restoreScrollTop(imgNode, distance) {
      this.root.scrollTop = this.getRealOffsetTop(imgNode) - distance;
    }
    getRealOffsetTop(imgNode) {
      return imgNode.offsetTop;
    }
    newMediaNode(imf) {
      if (imf.contentType?.startsWith("video")) {
        const vid = document.createElement("video");
        vid.classList.add("bifm-img");
        vid.classList.add("bifm-vid");
        vid.draggable = conf.dragImageOut;
        vid.onloadeddata = () => {
          if (this.visible && imf.index === this.currentIndex) {
            this.tryPlayVideo(vid);
          }
        };
        vid.src = imf.node.blobSrc;
        return vid;
      } else {
        const img = document.createElement("img");
        img.decoding = "async";
        img.classList.add("bifm-img");
        img.draggable = conf.dragImageOut;
        if (imf.stage === FetchState.DONE) {
          img.src = imf.node.blobSrc;
        } else if (imf.node.thumbnailSrc) {
          img.src = imf.node.thumbnailSrc;
        } else {
          img.src = DEFAULT_THUMBNAIL;
        }
        return img;
      }
    }
    // if element is not HTMLVideoElement, video controller will pause(detach) the last one which is HTMLVideoElement;
    tryPlayVideo(element) {
      if (element instanceof HTMLVideoElement) {
        if (!this.vidController) {
          this.vidController = new VideoControl(this.html.root);
        }
        this.vidController.attach(element);
      } else {
        this.vidController?.detach();
      }
    }
    /**
     * @param fix: 1 or -1, means scale up or down
     * @param rate: step of scale, eg: current scale is 80, rate is 10, then new scale is 90
     * @param specifiedPercent: directly set width percent 
     * @param syncConf: sync to config, default = true 
     */
    scaleBigImages(fix, rate, specifiedPercent, syncConf) {
      let oldPercent = conf.imgScale;
      let newPercent = specifiedPercent ?? oldPercent + rate * fix;
      switch (conf.readMode) {
        case "pagination":
          {
            const rule = queryRule(this.html.styleSheet, ".bifm-container-page");
            newPercent = Math.max(newPercent, 100);
            newPercent = Math.min(newPercent, 300);
            if (rule) rule.style.height = `${newPercent}%`;
            if (conf.paginationIMGCount === 1) {
              const imgRule = queryRule(this.html.styleSheet, ".bifm-container-page .bifm-img");
              if (imgRule) {
                imgRule.style.maxWidth = newPercent > 100 ? "" : "100%";
              }
            }
          }
          break;
        case "horizontal":
          {
            const scrollLeft = this.root.scrollLeft;
            const rule = queryRule(this.html.styleSheet, ".bifm-container-hori");
            newPercent = Math.max(newPercent, 80);
            newPercent = Math.min(newPercent, 300);
            if (rule) rule.style.height = `${newPercent}%`;
            this.root.scrollLeft = scrollLeft * (newPercent / oldPercent);
          }
          break;
        case "continuous":
          {
            const scrollTop = this.root.scrollTop;
            const rule = queryRule(this.html.styleSheet, ".bifm-container-vert");
            newPercent = Math.max(newPercent, 20);
            newPercent = Math.min(newPercent, 100);
            if (rule) rule.style.width = `${newPercent}%`;
            this.root.scrollTop = scrollTop * (newPercent / oldPercent);
          }
          break;
      }
      if (syncConf ?? true) {
        conf.imgScale = newPercent;
        saveConf(conf);
      }
      q("#scaleInput", this.html.pageHelper).textContent = `${newPercent}`;
      return newPercent;
    }
    resetScaleBigImages(syncConf) {
      const percent = conf.readMode !== "continuous" || IS_MOBILE ? 100 : conf.defaultImgScaleModeC;
      this.scaleBigImages(1, 0, percent, syncConf);
    }
    flushLoadingHelper() {
      if (this.currLoadingState.size === 0) {
        this.loadingHelper.style.display = "none";
      } else {
        if (this.loadingHelper.style.display === "none") {
          this.loadingHelper.style.display = "inline-block";
        }
        const ret = Array.from(this.currLoadingState).map(([k, v]) => `[P-${k + 1}: ${v}%]`);
        if (conf.reversePages) ret.reverse();
        this.loadingHelper.textContent = `Loading ${ret.join(",")}`;
      }
    }
    getPageNumber() {
      return this.pageNumInChapter[this.chapterIndex] ?? 0;
    }
    /**
    * This method will only be called when readmode is pagination
    */
    setElements() {
      let elements = Array.from(this.container.childNodes);
      const imgCount = conf.paginationIMGCount * 3;
      if (elements.length > imgCount) {
        const removed = elements.splice(imgCount);
        removed.forEach((elem) => elem.remove());
      } else {
        while (elements.length < imgCount) {
          const div = document.createElement("div");
          elements.push(div);
        }
      }
      const queue = this.getChapter(this.chapterIndex).filteredQueue;
      let [start, end] = [this.currentIndex - conf.paginationIMGCount, this.currentIndex + conf.paginationIMGCount * 2 - 1];
      [start, end] = [Math.max(start, 0), Math.min(end, queue.length - 1)];
      const withIndex = elements.map((elem) => ({ index: parseIndex(elem), elem })).sort((a, b) => a.index - b.index);
      const findOrSetIndex = (index) => {
        let found = withIndex.findIndex((i) => i.index === index);
        if (found > -1) return [withIndex.splice(found, 1)[0].elem, false];
        found = withIndex.findIndex((i) => i.index < start || i.index > end);
        if (found === -1) return [null, false];
        const element = withIndex.splice(found, 1)[0];
        element.elem.setAttribute("d-index", index.toString());
        return [element.elem, true];
      };
      elements = [];
      const ret = [];
      for (let i = start; i <= end; i++) {
        const [elem, reused] = findOrSetIndex(i);
        if (!elem) throw new Error(`BIFM.setElements cannot found element by index:[${i}], or found empty element`);
        const showing = i >= this.currentIndex && i < this.currentIndex + conf.paginationIMGCount;
        elements.push(elem);
        if (showing) {
          elem.classList.remove("bifm-node-hide");
          ret.push(elem);
        } else {
          elem.classList.add("bifm-node-hide");
        }
        if (reused || elem.childElementCount === 0) {
          elem.style.aspectRatio = "";
          elem.innerHTML = "";
          elem.appendChild(this.newMediaNode(queue[i]));
        }
      }
      if (conf.reversePages) elements.reverse();
      this.renderingElements = [...elements];
      const remain = withIndex.map((i) => {
        i.elem.setAttribute("d-index", "-1");
        i.elem.innerHTML = "";
        i.elem.classList.add("bifm-node-hide");
        return i.elem;
      });
      elements.push(...remain);
      this.container.append(...elements);
      return ret;
    }
  }
  class AutoPage {
    bifm;
    status;
    button;
    lockVer;
    constructor(BIFM, button) {
      this.bifm = BIFM;
      this.status = "stop";
      this.button = button;
      this.lockVer = 0;
      this.bifm.callbackOnWheel = () => {
        if (this.status === "running") {
          this.stop();
          this.start(this.lockVer);
        }
      };
      EBUS.subscribe("bifm-on-hidden", () => this.stop());
      EBUS.subscribe("bifm-on-show", () => conf.autoPlay && this.start(this.lockVer));
      EBUS.subscribe("toggle-auto-play", () => {
        if (this.status === "stop") {
          this.start(this.lockVer);
        } else {
          this.stop();
        }
      });
      this.initPlayButton();
    }
    initPlayButton() {
      this.button.addEventListener("click", () => {
        if (this.status === "stop") {
          this.start(this.lockVer);
        } else {
          this.stop();
        }
      });
    }
    async start(lockVer) {
      this.status = "running";
      this.button.setAttribute("data-status", "playing");
      const displayTexts = this.button.getAttribute("data-display-texts").split(",");
      this.button.firstElementChild.innerText = displayTexts[1];
      if (!this.bifm.visible) {
        const queue = this.bifm.getChapter(this.bifm.chapterIndex).filteredQueue;
        if (queue.length === 0) return;
        this.bifm.show(queue[this.bifm.currentIndex]);
      }
      const progress = q("#auto-page-progress", this.button);
      const interval = () => conf.readMode === "pagination" ? conf.autoPageSpeed : 1;
      while (true) {
        await sleep(10);
        progress.style.animation = `${interval() * 1e3}ms linear main-progress`;
        await sleep(interval() * 1e3);
        if (this.lockVer !== lockVer) {
          return;
        }
        progress.style.animation = ``;
        if (this.status !== "running") {
          break;
        }
        const queue = this.bifm.getChapter(this.bifm.chapterIndex).filteredQueue;
        if (this.bifm.currentIndex < 0 || this.bifm.currentIndex >= queue.length) break;
        if (conf.readMode === "pagination") {
          const curr = this.bifm.container.querySelector(`div[d-index="${this.bifm.currentIndex}"]`)?.firstElementChild;
          if (curr instanceof HTMLVideoElement) {
            let resolve;
            const promise = new Promise((r) => resolve = r);
            curr.addEventListener("timeupdate", () => {
              if (curr.currentTime >= curr.duration - 1) sleep(1e3).then(resolve);
            });
            await promise;
          }
        }
        const deltaY = this.bifm.root.offsetHeight / 2;
        this.bifm.onWheel(new WheelEvent("wheel", { deltaY }), true, true, true);
      }
      this.stop();
    }
    stop() {
      this.status = "stop";
      this.button.setAttribute("data-status", "paused");
      const progress = q("#auto-page-progress", this.button);
      progress.style.animation = ``;
      this.lockVer += 1;
      const displayTexts = this.button.getAttribute("data-display-texts").split(",");
      this.button.firstElementChild.innerText = displayTexts[0];
      this.bifm.scrollStop();
    }
  }
  function parseIndex(ele) {
    if (!ele) return -1;
    const d = ele.getAttribute("d-index") || "";
    const i = parseInt(d);
    return isNaN(i) ? -1 : i;
  }
  function stickyMouse(element, event, lastMouse, elementsWidth) {
    let [distanceY, distanceX] = [event.clientY - lastMouse.y, event.clientX - lastMouse.x];
    [distanceY, distanceX] = [-distanceY, -distanceX];
    const overflowY = element.scrollHeight - element.offsetHeight;
    if (overflowY > 0) {
      const rateY = conf.readMode === "continuous" ? 1 : overflowY / (element.offsetHeight / 4) * 3;
      let scrollTop = element.scrollTop + distanceY * rateY;
      scrollTop = Math.max(scrollTop, 0);
      scrollTop = Math.min(scrollTop, overflowY);
      element.scrollTop = scrollTop;
    }
    const overflowX = (elementsWidth ?? element.scrollWidth) - element.offsetWidth;
    if (overflowX > 0) {
      const rateX = conf.readMode !== "pagination" ? 1 : overflowX / (element.offsetWidth / 4) * 3;
      let scrollLeft = element.scrollLeft + distanceX * rateX;
      element.scrollLeft = scrollLeft;
    }
  }

  function revertMonkeyPatch(element) {
    const originalScrollTo = Element.prototype.scrollTo;
    Object.defineProperty(element, "scrollTo", {
      value: originalScrollTo,
      writable: true,
      configurable: true
    });
  }

  class Filter {
    values = [];
    allTags = /* @__PURE__ */ new Set();
    onChange;
    filterNodes(imfs, clearAllTags) {
      if (!conf.enableFilter) return imfs;
      let list = imfs;
      for (const val of this.values) {
        list = list.filter((imf) => {
          for (const t of imf.node.tags) {
            if (t === val.tag) {
              return true;
            }
          }
          return false;
        });
      }
      if (clearAllTags) {
        this.allTags.clear();
      }
      list.forEach((imf) => imf.node.tags.forEach((tag) => this.allTags.add(tag)));
      return list;
    }
    push(exclude, tag) {
      const exists = this.values.find((v) => v.tag === tag);
      if (exists) return;
      this.values.push({ exclude, tag });
      this.onChange?.(this);
    }
    remove(tag) {
      const index = this.values.findIndex((v) => v.tag === tag);
      if (index > -1) {
        this.values.splice(index, 1);
        this.onChange?.(this);
      }
    }
    clear() {
      this.values = [];
      this.onChange?.(this);
    }
  }

  function main(MATCHER, autoOpen, flowVision) {
    const FL = new Filter();
    const HTML = createHTML(FL);
    [HTML.fullViewGrid, HTML.bigImageFrame].forEach((e) => revertMonkeyPatch(e));
    const IFQ = IMGFetcherQueue.newQueue();
    const IL = new IdleLoader(IFQ);
    const PF = new PageFetcher(IFQ, MATCHER, FL);
    const DL = new Downloader(HTML, IFQ, IL, PF, MATCHER);
    const PH = new PageHelper(HTML, () => PF.chapters, () => DL.downloading);
    const BIFM = new BigImageFrameManager(HTML, (index) => PF.chapters[index]);
    new FullViewGridManager(HTML, BIFM, flowVision);
    const events = initEvents(HTML, BIFM, IFQ, IL, PH);
    addEventListeners(events, HTML, BIFM, DL, PH);
    EBUS.subscribe("downloader-canvas-on-click", (index) => {
      IFQ.currIndex = index;
      if (IFQ.chapterIndex !== BIFM.chapterIndex) return;
      BIFM.show(IFQ[index]);
    });
    EBUS.subscribe("notify-message", (level, msg, duration) => showMessage(HTML.messageBox, level, msg, duration));
    PF.beforeInit = () => HTML.pageLoading.style.display = "flex";
    PF.afterInit = () => {
      HTML.pageLoading.style.display = "none";
      IL.processingIndexList = [0];
      IL.start();
      if (conf.autoEnterBig || BIFM.visible) {
        const imf = IFQ[BIFM.getPageNumber()];
        if (imf) BIFM.show(imf);
      }
    };
    if (conf.first) {
      events.showGuideEvent();
      conf.first = false;
      saveConf(conf);
    }
    EBUS.subscribe("start-download", (cb) => {
      signal.first = false;
      if (PF.chapters.length === 0) {
        EBUS.emit("pf-init", () => {
          DL.start();
          cb();
        });
      } else {
        DL.start();
        sleep(20).then(cb);
      }
    });
    const signal = { first: true };
    function entry(expand) {
      if (HTML.pageHelper) {
        if (expand) {
          events.showFullViewGrid();
          if (signal.first) {
            signal.first = false;
            EBUS.emit("pf-init", () => {
            });
          }
        } else {
          ["config", "downloader"].forEach((id) => events.togglePanelEvent(id, true));
          events.hiddenFullViewGrid();
        }
      }
    }
    EBUS.subscribe("toggle-main-view", entry);
    if (conf.autoOpen && autoOpen) {
      HTML.entryBTN.setAttribute("data-stage", "open");
      entry(true);
    }
    return () => {
      console.log("destory eh-view-enhance");
      entry(false);
      PF.abort();
      IL.abort();
      IFQ.length = 0;
      EBUS.reset();
      document.querySelector("#ehvp-base")?.remove();
      return sleep(500);
    };
  }
  let destoryFunc;
  const debouncer = new Debouncer();
  function reMain() {
    debouncer.addEvent("LOCATION-CHANGE", () => {
      const newStart = () => {
        if (window.self !== window.top) {
          evLog("error", "in iframe");
          return;
        }
        if (document.querySelector(".ehvp-base")) return;
        const [matcher, autoOpen, flowVision] = adaptMatcher(window.location.href);
        if (matcher) {
          destoryFunc = main(matcher, autoOpen, flowVision);
        }
      };
      if (destoryFunc) {
        destoryFunc().then(newStart);
      } else {
        newStart();
      }
    }, 20);
  }
  setTimeout(() => {
    const oldPushState = history.pushState;
    history.pushState = function pushState(...args) {
      reMain();
      return oldPushState.apply(this, args);
    };
    const oldReplaceState = history.replaceState;
    history.replaceState = function replaceState(...args) {
      return oldReplaceState.apply(this, args);
    };
    window.addEventListener("popstate", reMain);
    reMain();
  }, 300);

})(saveAs, pica, zip);
