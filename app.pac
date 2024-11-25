function FindProxyForURL(url, host) {
    // 定义本地网络直连
    var direct = 'DIRECT;';
    var proxy = 'SOCKS5 127.0.0.1:2080';

    // 检查是否为特定的本地域名
    if (host.endsWith(".local")) {
        return direct;
    }

    // 检查是否为私有网络 IP 段
    var privateNets = [
        { net: "10.0.0.0", mask: "255.0.0.0" },       // 10.0.0.0/8
        { net: "172.16.0.0", mask: "255.240.0.0" },   // 172.16.0.0/12
        { net: "192.168.0.0", mask: "255.255.0.0" },  // 192.168.0.0/16
        { net: "169.254.0.0", mask: "255.255.0.0" }   // 169.254.0.0/16
    ];

    for (var i = 0; i < privateNets.length; i++) {
        if (isInNet(host, privateNets[i].net, privateNets[i].mask)) {
            return direct;
        }
    }

    // 检查是否为 .cn 域名
    if (host.endsWith(".cn")) {
        return direct;
    }

    // 检查是否为特定域名及其子域名
    var allowedDomains = [
        "baidu.com",
        "aliyun.com",
        "qq.com",
        "hao123.com",
        "baidubce.com"
    ];

    for (var j = 0; j < allowedDomains.length; j++) {
        if (host.endsWith("." + allowedDomains[j]) || host === allowedDomains[j]) {
            return direct;
        }
    }

    // 默认使用代理
    return proxy;
}