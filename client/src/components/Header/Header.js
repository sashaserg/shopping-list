import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Input } from '@material-ui/core';
import './Header.sass';
import connect from 'react-redux/es/connect/connect'
import {getShopListBySessionId, updateShopListBySessionId} from "../../store/actions/actionCreator";

const debounce = require('lodash.debounce');

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            localBudget: props.shopList.budget || 0
        };
    }

    componentWillReceiveProps(nextProps) {
        const { budget } = nextProps.shopList;
        if (this.state.localBudget !== budget)
            this.setState({
                localBudget: budget
            });
    }

    handleBudgetChange = (newBudget) => {
        this.setState({
            localBudget: newBudget,
        });
    };

    handleBudgetBlur = (budget) => {
        this.setState({
              localBudget: budget || 0
        });
        const newShopList = this.props.shopList;
        newShopList.budget = this.state.localBudget;
        this.props.updateShopListBySessionId(newShopList.shopSession, newShopList);
    };

    handlerBudgetChangeAccept = () => {
        const newShopList = this.props.shopList;
        newShopList.budget = this.state.localBudget;
        this.props.updateShopListBySessionId(newShopList.shopSession, newShopList);
    };

    render() {
        return (
            <div className={'Header-container'}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container justify={"space-between"} alignItems={"center"}>
                            <IconButton color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <div className={'centerBlock'}>
                                <Typography variant="body1" color="inherit" className={'headerName'}>
                                    Spent: { this.props.shopList.generalCost ? this.props.shopList.generalCost : 0}
                                </Typography>

                                <Typography variant="body1" color="inherit" className={'headerName'}>
                                    Budget:
                                </Typography>
                                <Input className={'budgetInput'}
                                       value={ this.state.localBudget }
                                       onChange={(e) => {this.handleBudgetChange(e.target.value)}}
                                       onClick={(e) => e.target.setSelectionRange(0, 100)}
                                       onBlur={(e) => {this.handleBudgetBlur(e.target.value)}}
                                />
                                {/*<Button variant="contained" color="secondary" size={"small"}
                                        onClick={() => {this.handlerBudgetChangeAccept()}}>
                                    Change
                                </Button>*/}
                            </div>
                            <Button color="inherit">Login</Button>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
