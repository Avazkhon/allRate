const fetch = require('node-fetch');
const passwords = require('../../../password');

class Yandex {

  formBody (details) {
    const formBody = [];
    for (let property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  instanceId() {
    const details = {
        client_id: passwords.yndexPassword.client_id,
    };

    return fetch('https://money.yandex.ru/api/instance-id', {
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.formBody(details),
      })
        .then(res => res.json())
        .then((res) => {
          console.log('method in instanceId', res);
          return res.instance_id;
        })
        .catch((err)=> {
          console.log(err)
        });
  }

  async getInvoice({amount_due}) {
    const details = {
      pattern_id: 'p2p',
      to: '410012284691047',
      amount_due,
      comment: `Пополнения счета №${null} с карты на сумму ${amount_due}`,
      message: 'Пополнения счета №${null}',
      label: 'Face Betting',
      instance_id: await this.instanceId(),
    };

    return fetch('https://money.yandex.ru/api/request-external-payment', {
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.formBody(details),
      })
        .then(res => res.json())
        .then((res) => {
          console.log('method in getInvoice', res);
          return { ...res, instance_id: details.instance_id };
        })
        .catch((err)=> {
          console.log(err);
        });
  }

  async makeInvoic({amount_due}) {
    const {
      status,
      request_id,
      // contract_amount,
      // money_source,
      // title,
      // fees,
      // recipient_identified,
      instance_id,
    } = await this.getInvoice({amount_due});

    let details = {
      request_id,
      instance_id,
      ext_auth_success_uri: `${process.env.MAIN_URL}/successful-translation`,
      ext_auth_fail_uri: `${process.env.MAIN_URL}/fail-translation`,
      // test_payment: true,
      // test_result: 'success',
    };

    return fetch('https://money.yandex.ru/api/process-external-payment', {
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.formBody(details),
      })
        .then(res => res.json())
        .then((result) => {
          console.log('method in makeInvoic', result);
          return {result, details};
        })
        .catch((err)=> {
          console.log(err)
        });
  }

  async checkInvoic({prevDetalis}) {

    return fetch('https://money.yandex.ru/api/process-external-payment', {
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.formBody(prevDetalis),
      })
        .then(res => res.json())
        .then((result) => {
          console.log('method in checkInvoic', result);
          return {result, prevDetalis};
        })
        .catch((err)=> {
          console.log(err)
        });
  }

}

module.exports = Yandex;
