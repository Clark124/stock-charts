import React, { Component } from 'react'
import lodash from 'lodash'
import { Modal, Input, Select, Button } from 'antd'
const Option = Select.Option;

export default class SetIndicatorModal extends Component {
    constructor() {
        super()
        this.state = {
            currentIndicatorOptions: {

            }
        }
    }
    UNSAFE_componentWillMount() {
        const { indicatorParam } = this.props
        this.setState({ currentIndicatorOptions: lodash.cloneDeep(indicatorParam.options) }, () => {
            console.log(this.state.currentIndicatorOptions)
        })

    }
    handleCancel() {
        this.props.closeModal()
    }
    changeCurrentIndicatorOptions(type, value) {
        const { currentIndicatorOptions } = this.state
        currentIndicatorOptions[type] = value
        this.setState({ currentIndicatorOptions })
    }
    removeChart() {
        const { indicatorParam } = this.props
        this.props.removeIndicator(indicatorParam.indicatorId)
    }
    changeChart() {
        const { indicatorParam } = this.props
        const { currentIndicatorOptions } = this.state
        this.props.changeIndicatorParam(indicatorParam.indicatorId, currentIndicatorOptions)
    }
    render() {
        const { indicatorParam } = this.props

        if (indicatorParam.value === 'ma' || indicatorParam.value === 'sma') {
            return (
                <Modal
                    visible={true}
                    mask={true}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置移动均线参数</div>
                    <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Period</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text" style={{ width: 200 }}
                                    value={this.state.currentIndicatorOptions.windowSize}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('windowSize', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Source</div>
                            <div style={{ flex: 2 }}>
                                <Select defaultValue="close" style={{ width: 200 }}
                                    onChange={(value) => { this.changeCurrentIndicatorOptions('sourcePath', value) }}
                                    value={this.state.currentIndicatorOptions.sourcePath}
                                >
                                    <Option value='open'>open</Option>
                                    <Option value='high'>high</Option>
                                    <Option value='low'>low</Option>
                                    <Option value='close'>close</Option>
                                </Select>
                            </div>
                        </div>

                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
                                onClick={() => this.removeChart()}
                            >
                                删除
                            </Button>
                            <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
                                onClick={() => this.changeChart()}
                            >
                                修改
                            </Button>
                        </div>
                    </div>
                </Modal>
            )
        }
        else if (indicatorParam.value === 'macd') {
            return (
                <Modal
                    visible={true}
                    mask={true}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置MACD指标参数</div>
                    <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Fast</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text" style={{ width: 200 }}
                                    value={this.state.currentIndicatorOptions.fast}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('fast', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Slow</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text"
                                    style={{ width: 200 }}
                                    value={this.state.currentIndicatorOptions.slow}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('slow', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Signal</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text"
                                    style={{ width: 200 }}
                                    value={this.state.currentIndicatorOptions.signal}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('signal', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Source</div>
                            <div style={{ flex: 2 }}>
                                <Select defaultValue="close" style={{ width: 200 }}
                                    onChange={(value) => { this.changeCurrentIndicatorOptions('sourcePath', value) }}
                                    value={this.state.currentIndicatorOptions.sourcePath}
                                >
                                    <Option value='open'>open</Option>
                                    <Option value='high'>high</Option>
                                    <Option value='low'>low</Option>
                                    <Option value='close'>close</Option>
                                </Select>
                            </div>
                        </div>

                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
                                onClick={() => this.removeChart()}
                            >
                                删除
                            </Button>
                            <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
                                onClick={() => this.changeChart()}
                            >
                                修改
                            </Button>
                        </div>
                    </div>
                </Modal>
            )
        }
        else if (indicatorParam.value === 'atr') {
            return (
                <Modal
                    visible={true}
                    mask={true}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置ATR指标参数</div>
                    <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Period</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text" style={{ width: 200 }}
                                    value={this.state.currentIndicatorOptions.windowSize}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('windowSize', Number(e.target.value))}
                                />
                            </div>
                        </div>

                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
                                onClick={() => this.removeChart()}
                            >
                                删除
                            </Button>
                            <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
                                onClick={() => this.changeChart()}
                            >
                                Change
                            </Button>
                        </div>
                    </div>
                </Modal>
            )
        }
        else if (indicatorParam.value === 'cci') {
            return (
                <Modal
                    visible={true}
                    mask={true}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置CCI指标参数</div>
                    <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Period</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text" style={{ width: 200 }}
                                    value={this.state.currentIndicatorOptions.windowSize}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('windowSize', Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
                                onClick={() => this.removeChart()}
                            >
                                删除
                            </Button>
                            <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
                                onClick={() => this.changeChart()}
                            >
                                修改
                            </Button>
                        </div>
                    </div>
                </Modal>
            )
        }
        else if (indicatorParam.value === 'bollingerBand') {
            return (
                <Modal
                    visible={true}
                    mask={true}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置BollingerBand指标参数</div>
                    <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Period</div>
                            <div style={{ flex: 2 }}>
                                {/*<Input type="text" value={String(this.state.currentIndicatorOptions.fast)} style={{width:200}}/>*/}
                                <Input type="text"
                                    style={{ width: 200 }}
                                    value={String(this.state.currentIndicatorOptions.windowSize)}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('windowSize', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Multiplier</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text"
                                    style={{ width: 200 }}
                                    value={String(this.state.currentIndicatorOptions.multiplier)}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('multiplier', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>MA Type</div>
                            <div style={{ flex: 2 }}>
                                <Select defaultValue="close" style={{ width: 200 }}
                                    onChange={(value) => this.changeCurrentIndicatorOptions('movingAverageType', value)}
                                    value={this.state.currentIndicatorOptions.movingAverageType}
                                >
                                    <Option value='ema'>ema</Option>
                                    <Option value='sma'>sma</Option>
                                </Select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Source</div>
                            <div style={{ flex: 2 }}>
                                <Select defaultValue="close" style={{ width: 200 }}
                                    onChange={(value) => this.changeCurrentIndicatorOptions('sourcePath', value)}
                                    value={this.state.currentIndicatorOptions.sourcePath}
                                >
                                    <Option value='open'>open</Option>
                                    <Option value='high'>high</Option>
                                    <Option value='low'>low</Option>
                                    <Option value='close'>close</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
                                onClick={() => this.removeChart()}
                            >
                                删除
                            </Button>
                            <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
                                onClick={() => this.changeChart()}
                            >
                                修改
                            </Button>
                        </div>
                    </div>
                </Modal>
            )
        }
        else if (indicatorParam.value === 'keltnerChannel') {
            return (
                <Modal
                    visible={true}
                    mask={true}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置KeltnerChannel指标参数</div>
                    <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Period</div>
                            <div style={{ flex: 2 }}>
                                {/*<Input type="text" value={String(this.state.currentIndicatorOptions.fast)} style={{width:200}}/>*/}
                                <Input type="text"
                                    style={{ width: 200 }}
                                    value={String(this.state.currentIndicatorOptions.windowSize)}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('windowSize', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Multiplier</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text"
                                    style={{ width: 200 }}
                                    value={String(this.state.currentIndicatorOptions.multiplier)}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('multiplier', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>MA Type</div>
                            <div style={{ flex: 2 }}>
                                <Select defaultValue="close" style={{ width: 200 }}
                                    onChange={(value) => this.changeCurrentIndicatorOptions('movingAverageType', value)}
                                    value={this.state.currentIndicatorOptions.movingAverageType}
                                >
                                    <Option value='ema'>ema</Option>
                                    <Option value='sma'>sma</Option>
                                </Select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Source</div>
                            <div style={{ flex: 2 }}>
                                <Select defaultValue="close" style={{ width: 200 }}
                                    onChange={(value) => this.changeCurrentIndicatorOptions('sourcePath', value)}
                                    value={this.state.currentIndicatorOptions.sourcePath}
                                >
                                    <Option value='open'>open</Option>
                                    <Option value='high'>high</Option>
                                    <Option value='low'>low</Option>
                                    <Option value='close'>close</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
                                onClick={() => this.removeChart()}
                            >
                                删除
                            </Button>
                            <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
                                onClick={() => this.changeChart()}
                            >
                                修改
                            </Button>
                        </div>
                    </div>
                </Modal>
            )
        }
        // else if (modalType === 'elderRaySetting') {
        //     return (
        //         <Modal
        //             visible={this.state.visible}
        //             style={styles.contentStyle}
        //             mask={false}
        //             onCancel={this.handleCancel}
        //             footer={null}
        //         >
        //             <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置Elder Ray指标参数</div>
        //             <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Period</div>
        //                     <div style={{ flex: 2 }}>
        //                         {/*<Input type="text" value={String(this.state.currentIndicatorOptions.fast)} style={{width:200}}/>*/}
        //                         <Input type="text"
        //                             style={{ width: 200 }}
        //                             value={String(this.state.currentIndicatorOptions.windowSize)}
        //                             onChange={(e) => this.changeCurrentIndicatorOptions('windowSize', e.target.value)}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>MA Type</div>
        //                     <div style={{ flex: 2 }}>
        //                         <Select defaultValue="close" style={{ width: 200 }}
        //                             onChange={(value) => this.changeCurrentIndicatorOptions('movingAverageType', value)}
        //                             value={this.state.currentIndicatorOptions.movingAverageType}
        //                         >
        //                             <Option value='ema'>ema</Option>
        //                             <Option value='sma'>sma</Option>
        //                         </Select>
        //                     </div>
        //                 </div>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Source</div>
        //                     <div style={{ flex: 2 }}>
        //                         <Select defaultValue="close" style={{ width: 200 }}
        //                             onChange={(value) => this.changeCurrentIndicatorOptions('sourcePath', value)}
        //                             value={this.state.currentIndicatorOptions.sourcePath}
        //                         >
        //                             <Option value='open'>open</Option>
        //                             <Option value='high'>high</Option>
        //                             <Option value='low'>low</Option>
        //                             <Option value='close'>close</Option>
        //                         </Select>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div style={{ marginTop: 20 }}>
        //                 <div style={{ textAlign: 'right' }}>
        //                     <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
        //                         onClick={() => this.removeChart()}
        //                     >
        //                         删除
        //                     </Button>
        //                     <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
        //                         onClick={() => this.changeChart()}
        //                     >
        //                         Change
        //                     </Button>
        //                 </div>
        //             </div>
        //         </Modal>
        //     )
        // } else if (modalType === 'forceIndexSetting') {
        //     return (
        //         <Modal
        //             visible={this.state.visible}
        //             style={styles.contentStyle}
        //             mask={false}
        //             onCancel={this.handleCancel}
        //             footer={null}
        //         >
        //             <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置Force Index指标参数</div>
        //             <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Smoothing Period</div>
        //                     <div style={{ flex: 2 }}>
        //                         {/*<Input type="text" value={String(this.state.currentIndicatorOptions.fast)} style={{width:200}}/>*/}
        //                         <Input type="text"
        //                             style={{ width: 200 }}
        //                             value={String(this.state.currentIndicatorOptions.smoothingWindow)}
        //                             onChange={(e) => this.changeCurrentIndicatorOptions('smoothingWindow', e.target.value)}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Smoothing Type</div>
        //                     <div style={{ flex: 2 }}>
        //                         <Select defaultValue="close" style={{ width: 200 }}
        //                             onChange={(value) => this.changeCurrentIndicatorOptions('smoothingType', value)}
        //                             value={this.state.currentIndicatorOptions.smoothingType}
        //                         >
        //                             <Option value='ema'>ema</Option>
        //                             <Option value='sma'>sma</Option>
        //                         </Select>
        //                     </div>
        //                 </div>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Source</div>
        //                     <div style={{ flex: 2 }}>
        //                         <Select defaultValue="close" style={{ width: 200 }}
        //                             onChange={(value) => this.changeCurrentIndicatorOptions('sourcePath', value)}
        //                             value={this.state.currentIndicatorOptions.sourcePath}
        //                         >
        //                             <Option value='open'>open</Option>
        //                             <Option value='high'>high</Option>
        //                             <Option value='low'>low</Option>
        //                             <Option value='close'>close</Option>
        //                         </Select>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div style={{ marginTop: 20 }}>
        //                 <div style={{ textAlign: 'right' }}>
        //                     <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
        //                         onClick={() => this.removeChart()}
        //                     >
        //                         删除
        //                     </Button>
        //                     <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
        //                         onClick={() => this.changeChart()}
        //                     >
        //                         Change
        //                     </Button>
        //                 </div>
        //             </div>
        //         </Modal>
        //     )
        // } 
        else if (indicatorParam.value === 'rsi') {
            return (
                <Modal
                visible={true}
                mask={true}
                footer={null}
                onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置RSI指标参数</div>
                    <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Period</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text" style={{ width: 200 }}
                                    value={this.state.currentIndicatorOptions.windowSize}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('windowSize', e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Source</div>
                            <div style={{ flex: 2 }}>
                                <Select defaultValue="close" style={{ width: 200 }}
                                    onChange={(value) => { this.changeCurrentIndicatorOptions('sourcePath', value) }}
                                    value={this.state.currentIndicatorOptions.sourcePath}
                                >
                                    <Option value='open'>open</Option>
                                    <Option value='high'>high</Option>
                                    <Option value='low'>low</Option>
                                    <Option value='close'>close</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
                                onClick={() => this.removeChart()}
                            >
                                删除
                            </Button>
                            <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
                                onClick={() => this.changeChart()}
                            >
                                修改
                            </Button>
                        </div>
                    </div>
                </Modal>
            )
        }
        //else if (modalType === 'sarSetting') {
        //     return (
        //         <Modal
        //             visible={this.state.visible}
        //             style={styles.contentStyle}
        //             mask={false}
        //             onCancel={this.handleCancel}
        //             footer={null}
        //         >
        //             <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置RSI指标参数</div>
        //             <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Acceleration Factor</div>
        //                     <div style={{ flex: 2 }}>
        //                         <Input type="text" style={{ width: 200 }}
        //                             value={this.state.currentIndicatorOptions.accelerationFactor}
        //                             onChange={(e) => this.changeCurrentIndicatorOptions('accelerationFactor', e.target.value)}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Max Acceleration Factor</div>
        //                     <div style={{ flex: 2 }}>
        //                         <Input type="text" style={{ width: 200 }}
        //                             value={this.state.currentIndicatorOptions.maxAccelerationFactor}
        //                             onChange={(e) => this.changeCurrentIndicatorOptions('maxAccelerationFactor', e.target.value)}
        //                         />
        //                     </div>
        //                 </div>
        //             </div>
        //             <div style={{ marginTop: 20 }}>
        //                 <div style={{ textAlign: 'right' }}>
        //                     <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
        //                         onClick={() => this.removeChart()}
        //                     >
        //                         删除
        //                     </Button>
        //                     <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
        //                         onClick={() => this.changeChart()}
        //                     >
        //                         Change
        //                     </Button>
        //                 </div>
        //             </div>
        //         </Modal>
        //     )
        // } else if (modalType === 'stochasticOscillatorSetting') {
        //     return (
        //         <Modal
        //             visible={this.state.visible}
        //             style={styles.contentStyle}
        //             mask={false}
        //             onCancel={this.handleCancel}
        //             footer={null}
        //         >
        //             <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置Stochastic Oscillator指标参数</div>
        //             <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Period</div>
        //                     <div style={{ flex: 2 }}>
        //                         <Input type="text" style={{ width: 200 }}
        //                             value={this.state.currentIndicatorOptions.windowSize}
        //                             onChange={(e) => this.changeCurrentIndicatorOptions('windowSize', e.target.value)}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>K</div>
        //                     <div style={{ flex: 2 }}>
        //                         <Input type="text"
        //                             style={{ width: 200 }}
        //                             value={this.state.currentIndicatorOptions.kWindowSize}
        //                             onChange={(e) => this.changeCurrentIndicatorOptions('kWindowSize', e.target.value)}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        //                     <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>D</div>
        //                     <div style={{ flex: 2 }}>
        //                         <Input type="text"
        //                             style={{ width: 200 }}
        //                             value={this.state.currentIndicatorOptions.dWindowSize}
        //                             onChange={(e) => this.changeCurrentIndicatorOptions('dWindowSize', e.target.value)}
        //                         />
        //                     </div>
        //                 </div>
        //             </div>
        //             <div style={{ marginTop: 20 }}>
        //                 <div style={{ textAlign: 'right' }}>
        //                     <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
        //                         onClick={() => this.removeChart()}
        //                     >
        //                         删除
        //                     </Button>
        //                     <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
        //                         onClick={() => this.changeChart()}
        //                     >
        //                         Change
        //                     </Button>
        //                 </div>
        //             </div>
        //         </Modal>
        //     )
        // } 
        else if (indicatorParam.value === 'kdj') {
            return (
                <Modal
                    visible={true}
                    mask={true}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 20 }}>设置KDJ指标参数</div>
                    <div style={{ paddingTop: 30, paddingBottom: 15, borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>Period</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text" style={{ width: 200 }}
                                    value={this.state.currentIndicatorOptions.windowSize}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('windowSize', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>K</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text"
                                    style={{ width: 200 }}
                                    value={this.state.currentIndicatorOptions.kWindowSize}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('kWindowSize', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: 30, fontSize: 16, fontWeight: 'bold' }}>D</div>
                            <div style={{ flex: 2 }}>
                                <Input type="text"
                                    style={{ width: 200 }}
                                    value={this.state.currentIndicatorOptions.dWindowSize}
                                    onChange={(e) => this.changeCurrentIndicatorOptions('dWindowSize', Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button style={{ backgroundColor: '#D9534F', color: '#FFF', marginRight: 20 }}
                                onClick={() => this.removeChart()}
                            >
                                删除
                            </Button>
                            <Button style={{ backgroundColor: '#5CB85C', color: '#FFF' }}
                                onClick={() => this.changeChart()}
                            >
                                修改
                            </Button>
                        </div>
                    </div>
                </Modal>
            )
        }
    }
}