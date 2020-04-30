import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
} from 'react-bootstrap';

import CommonModal from 'widgets/CommonModal';
import Messages from 'components/Messages';
import SiteBar from 'components/SiteBar';
import MakeRateTabel from './components/MakeRateTabel';
import ReasonForBettingCard from './components/ReasonForBettingCard';

import style from './style';

const url = 'https://sun9-39.userapi.com/c852216/v852216813/1239e2/VZL0QayR6E4.jpg?ava=1';

import {
  basisForPayment,
} from '../../../constants';

class MakeRateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      reasonForBetting: {},
      participant: {},
      summMany: 0,
    }
  }

  handleModal = (e) => {
    if (this.state.isShowModal) {
      this.setState((prevState) => ({
        isShowModal: !prevState.isShowModal
      }));
      return;
    };
    const { partynumber } = e.currentTarget.dataset;
    const { mainBet, party } = this.props.rate.data;
    const reasonForBetting = mainBet[partynumber];
    const participant = party.find(
      (itm) => itm.id === reasonForBetting.idParty
    );

    this.setState((prevState) => ({
      isShowModal: !prevState.isShowModal,
      reasonForBetting,
      participant,
    }))
  }

  handleChangeMany = (e) => {
    const { value } = e.target;
    this.setState({summMany: value})
  }

  submitRFB = () => {
    const {
      postInvoice,
      auth,
      rate: {
        data: rate
      },
      purse,
    } = this.props;
    if (typeof postInvoice === 'function') {
      const { userId } = auth.auth;
      const { summMany, reasonForBetting } = this.state;

      const participant = {
        userId,
        meny: summMany,
        localTime: new Date(),
      };
      const partyNumber = Object.keys(rate.mainBet)
      .find(bet => +rate.mainBet[bet].idParty === +reasonForBetting.idParty)

      const invoice = {
        amount: summMany,
        requisites: {
          src: purse.purse._id,
          target: rate.mainBet.purseId,
        },
        basisForPayment: basisForPayment.makeRate,
        createTime: new Date,
      }
      postInvoice({ ...invoice, rate: { id: rate._id, partyNumber, participant } });
    }
  }

  render() {
    const {
      isShowModal,
      reasonForBetting,
      participant,
      summMany,
    } = this.state;

    const {
      classes,
      rate: {
        data: rate,
        error,
        isFetching,
      },
      auth,
      purse,
    } = this.props;
    return (
      <div
        className={classes['make-rate']}
      >

        <CommonModal
          open={isShowModal}
          toggle={this.handleModal}
        >
          <ReasonForBettingCard
            amount={purse.purse && purse.purse.amount}
            reasonForBetting={reasonForBetting}
            participant={participant}
            submitRFB={this.submitRFB}
            summMany={summMany}
            handleChangeMany={this.handleChangeMany}
          />
        </CommonModal>

        <Container>
          <Row>
            <Col xs="12" sm="3" >
              <SiteBar
                userId={auth.userId}
              />
            </Col>
            <Col xs="12" sm="9">
              <Messages
                error={error}
                isFetching={isFetching}
              />

              {
                rate &&
                <Col sm="12" md="12">
                  <Image style={{ width: '100%' }} src={rate.img}/>
                </Col>
              }
              {
                rate &&
                <Card>
                  <Card.Header>{rate.title}</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col sm="4" md="3">
                        <Card.Title>{rate.party[0].participator}</Card.Title>
                      </Col>
                      <Col sm="4" md="3">
                        <Image src={rate.party[0].img}/>
                      </Col>
                      <Col sm="4" md="3">
                        <Image src={rate.party[1].img}/>
                      </Col>
                      <Col sm="4" md="3">
                        <Card.Title>{rate.party[1].participator}</Card.Title>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <Card.Text>{rate.description}</Card.Text>
                  </Card.Footer>
                </Card>
              }
              {
                rate &&
                <MakeRateTabel
                  handleModal={this.handleModal}
                  mainBet={rate.mainBet}
                  party={rate.party}
                />
              }

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

MakeRateComponent.propType = {
  rate: PropTypes.shape({}),
  purse: PropTypes.shape({}),
  classes: PropTypes.shape({}),
  postInvoice: PropTypes.func,
}

export default injectSheet({...style})(MakeRateComponent);
