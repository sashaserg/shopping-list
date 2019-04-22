import React, { Component } from 'react';
import './ItemPanel.sass';
import { Grid, Paper, Input } from '@material-ui/core';
import { Done, Clear }  from '@material-ui/icons'
import {amountInputProps, costInputProps} from '../../constants';

class ItemPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.item.name,
            amount: props.item.amount,
            cost: props.item.cost,
        }
    }
    handleValuesChange(fieldName, fieldValue) {
        this.setState({
            [fieldName]: fieldValue
        })
    }

    render() {
        return (
            <Grid item container alignItems={"center"} className={'ItemPanel-container'}>
                <Grid item xs={10} lg={10}>
                    <Paper className={'itemPanel ' + this.props.className}>
                        <Grid container wrap="nowrap" spacing={16}>
                            <Grid item xs={6}>
                                <Input placeholder="Name" className={'nameInput'} defaultValue={this.state.name}
                                       onChange={(e) => {this.handleValuesChange('name', e.target.value)}} />
                            </Grid>
                            <Grid item xs>
                                <Input placeholder="Amount" className={'secondaryInput'} defaultValue={this.state.amount} type={'number'}
                                       inputProps={amountInputProps}
                                       onChange={(e) => {this.handleValuesChange('amount', e.target.value)}}/>
                            </Grid>
                            <Grid item xs>
                                <Input placeholder="Cost" className={'secondaryInput'} defaultValue={this.state.cost} type={'number'}
                                       inputProps={costInputProps}
                                       onChange={(e) => {this.handleValuesChange('cost', e.target.value)}}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item container xs={2} lg={2} justify={"center"}>
                    <Grid item>
                        <Done className={'panelIcon'} id={'acceptIcon'} fontSize={"large"}
                              onClick={ () => { this.props.onCompleteHandler(this.props.index, {
                                  realName: this.state.name,
                                  realAmount: this.state.amount,
                                  realCost: this.state.cost,
                              })}}/>
                    </Grid>
                    <Grid item>
                        <Clear className={'panelIcon'} id={'deleteIcon'} fontSize={"large"}
                               onClick={() => {this.props.onDeleteHandler(this.props.index)}}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
};
export default ItemPanel;
