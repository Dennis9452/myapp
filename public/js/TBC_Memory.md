# Memory usage of LiTV on TBC O5 box



## 常態操作 LiTV App 的記憶體使用狀況



![](https://i.imgur.com/43oCTgQ.png)



* 長條圖部分表示 free Memory (空閒記憶體量)

* 橘色折線圖表示 App 使用的 Memory 量（與未開啟 App 的 Memory 比較）

* 使用狀態穩定。



## Memory 在各頁面的使用程度

觀察頁面跳轉時的記憶體使用狀況，能發現 Memory 有釋放，沒有 Leak 現象。



* 首頁  

![](https://i.imgur.com/ODeGvQ2.png)



* 熱門戲劇  

![](https://i.imgur.com/bKfi1lF.png)



* 影片介紹頁  

![](https://i.imgur.com/ZJhw0ua.png)



* 返回熱門戲劇  

![](https://i.imgur.com/H17J7pR.png)



* 返回首頁  

![](https://i.imgur.com/LBgjPX0.png)





## 影片播放期間 memory 使用程度


  

![](https://i.imgur.com/Cqrp9fY.png)

* 長條圖部分表示 free Memory (空閒記憶體量)

* 橘色折線圖表示影片播放時的 Memory 量（與未播放時的 Memory 比較）

* 使用狀態穩定。


* 後續再回到影片介紹頁面後 Memory 有釋放，沒有 Leak 現象。  

![](https://i.imgur.com/CUZfUcw.png)