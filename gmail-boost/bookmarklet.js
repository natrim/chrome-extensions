(function(){const gmail_acc_number = 0;
    if (window.location.href.indexOf("https://mail.google.com/mail/u/" + gmail_acc_number + "/") === -1) {
        alert("No allowed GMAIL account found");
        return;
    }
    const button_text = document.querySelector('html').lang === "cs" ? "Zkontrolovat poštu teď" : "Check mail now";
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
window.location.assign('https://mail.google.com/mail/u/' + gmail_acc_number + '/#settings/accounts');
    let loading = true;
    let limit = 50;
    let limiter = 0;
    const refreshAccounts = () => {
        const currentNode = document.querySelectorAll("span[role=link]");
        if (!Array.prototype.some.call(currentNode, ((a) => {
            return a.textContent.includes(button_text);
        }))) {
            if (limiter > limit) {
                alert("No GMAIL pop3 import found");
                window.location.assign('https://mail.google.com/mail/u/' + gmail_acc_number + '/' + (isRefreshAvailable ? hash : '#inbox'));
                return;
            }
            limiter++;
            setTimeout(refreshAccounts, 100);
        } else {
            if (loading) {
                loading = false;
                setTimeout(refreshAccounts, 1000);
            } else {
                currentNode.forEach((a) => {
                    if (a.textContent.includes(button_text)) {
                        a.click();
                    }
                });
                window.location.assign('https://mail.google.com/mail/u/' + gmail_acc_number + '/' + (isRefreshAvailable ? hash : '#inbox'));
            }
        }
    };
    setTimeout(refreshAccounts, 100);})();
