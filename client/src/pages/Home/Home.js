import React, { Component } from 'react';
import './Home.sass';
import { Grid, Paper, Input, Button } from '@material-ui/core';
import connect from 'react-redux/es/connect/connect'
import ItemPanel from '../../components/ItemPanel/ItemPanel'
import {getCookie, randomStringValue, setCookie} from "../../utils/cookieUtil";
import {SHOPPING_SESSION} from "../../constants";
import {getShopListBySessionId, updateShopListBySessionId} from "../../store/actions/actionCreator";
import {amountInputProps, costInputProps} from '../../constants';

class Home extends Component {
    constructor(props) {
        console.log('home constructor');
        super(props);
        this.state = {
            headName: '',
            headCost: 0, // one item cost
            headAmount: 0,
            shouldAlertAboutBudget: true,
        }
    }
    componentDidMount() {
        console.log('home componentDidMount');
        if(getCookie(SHOPPING_SESSION)) {
            const shopSession = getCookie(SHOPPING_SESSION);
            this.props.getShopListBySessionId(shopSession);
        }
        else {
            let date = new Date;
            date.setDate(date.getDate() + 10);
            const options = {
                path: '/',
                expires: date
            };
            const cookieValue = randomStringValue();
            setCookie(SHOPPING_SESSION, cookieValue, options);
        }
    }

    renderItems() {
        return (
            <>{
                this.props.shopList.shopItems.map((i) => {
                    if(i)
                        return <ItemPanel key               = { i.key }
                                          item              = { i }
                                          index             = { i.key }
                                          className         = { i.done ? 'done' : 'open' }
                                          onCompleteHandler = { this.handleCompleteListItem }
                                          onDeleteHandler   = { this.handleDeleteListItem } />
                })
            }</>
        );
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleCompleteListItem = (index, { realName, realAmount, realCost }) => {
        const shopList = this.props.shopList;
        let newGeneralCost = 0;
        shopList.shopItems = this.props.shopList.shopItems.map(function(item){
            if(item.key === index) {
                item.done = !item.done;
                item.name = realName;
                item.amount = realAmount;
                item.cost = realCost;
            }
            if(item.done)
                newGeneralCost += parseFloat(item.cost) * parseInt(item.amount);
            return item;
        });
        shopList.generalCost = newGeneralCost;
        this.props.updateShopListBySessionId(shopList.shopSession, shopList);
    };
    handleDeleteListItem = (index) => {
        const shopList = this.props.shopList;
        let reducedGeneralCost = 0;
        shopList.shopItems = shopList.shopItems.filter(function(item){
            if( item.key === index && item.done )
                reducedGeneralCost += parseFloat(item.cost) * parseInt(item.amount);
            return item.key !== index;
        });
        shopList.generalCost -= reducedGeneralCost;
        if( shopList.shopItems.length === 0) this.setState({
            shouldAlertAboutBudget: true,
        });
        this.props.updateShopListBySessionId(shopList.shopSession, shopList);
    };
    handleAddNewListItem() {
        const newShopList = this.props.shopList;
        const listItem = {
            key: randomStringValue(),
            name: this.state.headName,
            amount: this.state.headAmount,
            cost: this.state.headCost
        };
        newShopList.shopItems = this.props.shopList.shopItems.concat(listItem);
        this.props.updateShopListBySessionId(newShopList.shopSession, newShopList);
    }

    render() {
        return (
            <div className={'Home-container'}>
                <Grid container spacing={24} alignItems={"center"} direction={"column"}>
                    <Grid item container xs={12} sm={8} md={6} lg={5}>
                        <Paper className={'headPanel'}>
                            <Grid container wrap="nowrap" spacing={16}>
                                <Grid item xs={6}>
                                    <Input placeholder="Name" className={'nameInput'} name={'headName'}
                                           required onChange={(e) => {this.handleInputChange(e)}}/>
                                </Grid>
                                <Grid item xs>
                                    <Input placeholder="Amount" className={'secondaryInput'} name={'headAmount'} type={'number'}
                                           inputProps={amountInputProps}
                                           onChange={(e) => {this.handleInputChange(e)}}/>
                                </Grid>
                                <Grid item xs>
                                    <Input placeholder="Price one" className={'secondaryInput'} name={'headCost'} type={'number'}
                                           inputProps={costInputProps}
                                           onChange={(e) => {this.handleInputChange(e)}}/>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary"
                                            onClick={(e) => {this.handleAddNewListItem(e)}}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item container className={'itemsContainer'} direction={"column"}
                          alignItems={"center"} xs={12} sm={8} md={6} lg={5} spacing={8}>
                        {
                            this.props.shopList.shopItems ?
                                this.renderItems()
                                :
                                <div>Add some items above</div>
                        }
                    </Grid>

                </Grid>
            </div>
        );
    }

    checkBudgetSpent() {
        if (( this.props.shopList.generalCost > this.props.shopList.budget ) && this.state.shouldAlertAboutBudget ) {
            alert("You`ve spent more money than you have budgeted for.");
            this.setState({
                shouldAlertAboutBudget: false,
            })
        }
    }

    componentDidUpdate() {
        this.checkBudgetSpent();
    }


}

const mapStateToProps = (state) => {
    return {
        shopList: state.shoppingReducer.shopList,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getShopListBySessionId: (sessionId) => dispatch(getShopListBySessionId(sessionId)),
    updateShopListBySessionId: (sessionId, shopList) => dispatch(updateShopListBySessionId(sessionId, shopList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
