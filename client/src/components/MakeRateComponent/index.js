import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { AiFillEye } from "react-icons/ai";
import moment from 'moment';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import Rating from 'widgets/Rating';
import CommonModal from 'widgets/CommonModal';
import Messages from 'components/Messages';
import SiteBar from 'components/SiteBar';
import MakeRateTabel from './MakeRateTabel';
import ReasonForBettingCard from './ReasonForBettingCard';

import style from './style';

const url = 'https://sun9-39.userapi.com/c852216/v852216813/1239e2/VZL0QayR6E4.jpg?ava=1';

import {
  basisForPayment,
  formatDateTime,
  rateStatusLive,
} from '../../constants';

class MakeRateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      reasonForBetting: {},
      participant: {},
      summMany: 0,
      warningInfoice: '',
      isFetchingInfoice: false,
      errorInfoice: '',
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
      warningInfoice: '',
      errorInfoice: '',
      summMany: 0,
    }))
  }

  handleChangeMany = (e) => {
    const { value } = e.target;
    this.setState({summMany: Number(value)})
  }

  submitRFB = () => {
    const {
      postInvoice,
      auth,
      rate: {
        data: rate
      },
      purse,
      getRateByID,
      getPurse,
    } = this.props;

    if (typeof postInvoice === 'function') {
      this.setState({
        isFetchingInfoice: true,
      });

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
      postInvoice({ ...invoice, rate: { id: rate._id, partyNumber, participant } })
      .then((action) => {
        if (action.status === 'SUCCESS') {
          getRateByID(rate._id);
          getPurse();
          this.setState({
            warningInfoice: 'Операция успешно выполненна!',
            isFetchingInfoice: false,
          });
        } else {
          this.setState({
            errorInfoice: action.error,
            isFetchingInfoice: false,
          });
        }
      });
    }
  }

  render() {
    const {
      isShowModal,
      reasonForBetting,
      participant,
      summMany,
      warningInfoice,
      isFetchingInfoice,
      errorInfoice,
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
      changeRatingRate,
      getRateByID,
    } = this.props;

    const isDisabled = rate && (
      (rate.statusLife === rateStatusLive.in_progress)
      || (rate.statusLife === rateStatusLive.finish)
      || (rate.statusLife === rateStatusLive.archive)
    )

    return (
      <div
        className={classes['make-rate']}
      >

        <CommonModal
          open={isShowModal}
          toggle={this.handleModal}
        >
          <ReasonForBettingCard
            warning={warningInfoice}
            isFetching={isFetchingInfoice}
            error={errorInfoice}
            purse={purse}
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
                userData={auth.userData}
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
                    <Row>
                      <Col>
                        <ListGroup className="list-group-flush">
                          {
                            !isDisabled &&
                            <ListGroupItem>Начало: {moment(rate.dateStart).format(formatDateTime)}</ListGroupItem>
                          }
                          <ListGroupItem>Конец: {moment(rate.dateFinish).format(formatDateTime)}</ListGroupItem>
                        </ListGroup>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              }
              {
                rate &&
                <MakeRateTabel
                  handleModal={this.handleModal}
                  rate={rate}
                  isDisabled={isDisabled}
                />
              }
              {
                rate &&
                <Row>
                  <Col ms="2">
                    <AiFillEye title="Просмотры"/> {rate.views}
                  </Col>
                  <Col>
                    <Rating
                      changeRating={changeRatingRate}
                      rating={rate.rating}
                      postId={rate._id}
                      isShow
                    />
                  </Col>
                </Row>
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

MakeRateComponent.propTypes = {
  rate: PropTypes.shape(),
  purse: PropTypes.shape(),
  classes: PropTypes.shape(),
  postInvoice: PropTypes.func,
  getRateByID: PropTypes.func,
  getPurse: PropTypes.func,
  changeRatingRate: PropTypes.func,
}

export default injectSheet({...style})(MakeRateComponent);
