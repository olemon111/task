## URL编码

#### 从ASCII&Unicode说起

* ```ASCII```

  * ```128```个符号
  * 占用```1```字节

* 非```ASCII```编码

  * ```GB2312```

    * ```2```字节表示一个汉字

      > 256*256=65536

* ```unicode```

  * ```Universal Multiple-Octet Coded Character Set  -> UCS```

  * ```100```多万个符号

    > 规定的只是编码方式（二进制代码）没有存储方式

  * 问题

    * 怎么区分```Unicode```和```ASCII```？？？
    * 三个字节是一个符号还是仨？？？
    * 结果：出现多种二进制格式存储

* ```utf-8```

  * 互联网使用最广的一种```unicode```实现方式

  * ```utf-16```(两个或四个字节) ```utf-32```(四个字节)

  * ```1~4```个字节：可变长！

  * 两条规则

    * > 1.  对于单字节的符号，字节的第一位设为`0`，后面7位为这个符号的 ```Unicode``` 码。因此对于英语字母，```UTF-8``` 编码和 ```ASCII``` 码是相同的 
      > 2.  对于`n`字节的符号（`n > 1`），第一个字节的前`n`位都设为`1`，第`n + 1`位设为`0`，后面字节的前两位一律设为`10`。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码 

      > 栗子：
      >
      > ```js
      > Unicode符号范围     |        UTF-8编码方式
      > (十六进制)          |              （二进制）
      > ----------------------+---------------------------------------------
      > 0000 0000-0000 007F | 0xxxxxxx
      > 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
      > 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
      > 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      > ```

    * 解读
      * 一个字节第一位是```0``` -> 单独一个字符
      * 第一位是```1``` -> 有几个```1```就占用几个字节
----

#### 为啥要编码

###### ```url```编码 の 混乱

* 避免歧义

  * ```?postid=5038412&t=1450591802326```

  * 根据```& =```解析```key```和```value```

    * > 保洁公司叫```P&G``` -> 解析错误

* 避免非法字符

  * ```url```只使用```ASCII```字符集

    > 在```Firefox```或```chrome```中搜索中文时浏览器地址栏包含中文
    >
    > 显示时又对```url```进行了解码
  
* 结论： 不同的操作系统、不同的浏览器、不同的网页字符集，将导致完全不同的编码结果 

###### ```js```编码解码函数

* 对策： 先对URL编码，然后再向服务器提交，不给浏览器插手的机会， 保证了服务器得到的数据是格式统一的  

* ```js```函数的输入输出默认都是```unicode```

  1. ```escape```

     > 古老 非标准 不提倡
     >
     > 不直接用于```URL```编码，只是返回一个字符的```unicode```编码值

  2. ```encodeURI``` 和```decodeURI```

     > 对整个```url```非法字符进行编码
     >
     > 作用：避免非法字符

  3. ```encodeURIComponent```和```decodeURIComponent```

     > 对```url```组成部分进行个别编码
     >
     > 对所有保留字编码：```  ; / ? : @ & = + $ , ```
     >
     > 作用：避免参数解析错误

  * 主要区别

    * 前者着眼于对整个```url```编码，一些功能字符```& ? / =```不会被转义

      ```js
      encodeURI('https://www.baidu.com/ a b c')
      // "https://www.baidu.com/%20a%20b%20c"
      encodeURIComponent('https://www.baidu.com/ a b c')
      // "https%3A%2F%2Fwww.baidu.com%2F%20a%20b%20c"
      ```

    * 后者应用：手工拼```url```时给每对```key```- ```value```转义

---

### 请求の踩坑记

###### ```URLSearchParams()```

* 浏览器内置对```URL```进行处理的```API```
* 使用
  * 实例的常用方法
    * ```append```（添加新的键值对作为查询参数） ```set``` (有则改之，无则加勉) ```delete```
    * ```get```和```getAll```（数组形式）
    * ```has```

###### ```axios```

* 默认数据格式```application/json;charset=UTF-8```

###### 问题：添加事项时使用```axios```请求失败，后台收到的数据是```undefined```，即使手动改了```Content-Type```也8行

###### 解决方法： 使用```URLSearchParams```来处理参数 

###### 原因

* 使用表单实现```addItem```，通信方式为```application/x-www-form-urlencoded```格式，即以键值对形式```?key1=value&key2=value2```

* ```axios```采用```application/json```格式

* 直接修改```Content-Type```为啥不星

  * 上```axios```源码

    ``` js
        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              // Remove Content-Type if data is undefined
              delete requestHeaders[key];
            } else {
              // Otherwise add header to the request
              request.setRequestHeader(key, val);
            }
          });
        }
    ```

  * 万恶的```if```

    * 拿到的```data```为```undefined```，```axios```内部直接删了```Content-Type```
    * 为啥要删？栗：```get```请求属于简单请求，不存在```data```,本身不需要设置```Content-Type```