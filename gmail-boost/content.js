// set theme-color
(function() {
    var theme = document.querySelector("[name=theme-color]")
    if (theme) {
        theme.content = "hsla(200, 19%, 20%, 1)";
        // theme.media= "(prefers-color-scheme: dark)";
    } else {
        var meta = document.createElement("meta");
        meta.name = "theme-color";
        meta.content = "hsla(200, 19%, 20%, 1)";
        // meta.media= "(prefers-color-scheme: dark)";
        document.getElementsByTagName("head")[0].prepend(meta);
    }
})();

// read all pop3
 (function () {
    const gmail_acc_number = 0;
    const button_text = document.querySelector('html').lang === "cs" ? "Zkontrolovat poštu teď" : "Check mail now";
    if(window.location.href.indexOf("https://mail.google.com/") === -1){
        return;
    }
    let isRefreshAvailable = false;
    const hash = window.top.location.hash;
    switch (hash) {
      case "#mbox":
      case "#inbox":
      case "#all":
      case "#imp":
      case "#trash":
      case "#spam":
      case "#chats":
      case "#starred":
      case "#sent":
      case "#outbox":
      case "#snoozed":
      case "#scheduled":
      case "#drafts":
        isRefreshAvailable = true;
        break;
      default:
        if (top.location.hash.match(/#label/gi)) {
          isRefreshAvailable = true;
        } else if (top.location.hash.match(/#category/gi)) {
          isRefreshAvailable = true;
        }
    }
    if (!isRefreshAvailable) {
        console.log("pop3 reload skip");
        return;
    }
    window.location.assign('https://mail.google.com/mail/u/'+gmail_acc_number+'/#settings/accounts');
    let loading = true;
    let limit = 50;
    let limiter = 0;
    console.log("pop3 reload start");
    const refreshAccounts = () => {
        const currentNode = document.querySelectorAll("span[role=link]");
        if (!Array.prototype.some.call(currentNode, ((a) => {
            return a.textContent.includes(button_text);
        }))) {
            if (limiter > limit) {
                console.log("no gmail pop3 found, abort reload");
                window.location.assign('https://mail.google.com/mail/u/'+gmail_acc_number+'/'+(isRefreshAvailable ? hash : '#inbox'));
                return;
            }
            limiter++;
            setTimeout(refreshAccounts, 100);
        } else {
            if (loading) {
                loading = false;
                // need to wait for stuff to load
                setTimeout(refreshAccounts, 1000);
            } else {
                currentNode.forEach((a) => {
                    if (a.textContent.includes(button_text)) {
                        a.click();
                    }
                });
                console.log("pop3 reload done");
                window.location.assign('https://mail.google.com/mail/u/'+gmail_acc_number+'/'+(isRefreshAvailable ? hash : '#inbox'));
            }
        }
    };
    setTimeout(refreshAccounts, 100);
})();
