import * as React from 'react'
import { connect } from 'react-redux'

import * as styles from './styles.scss'

import { getAllSings, addNewSing, editSing, deleteSing } from "../../AC/sings";
import {NewSingModal} from "./NewSingModal/NewSingModal";
import {EditSingModal} from "./EditSingModal/EditSingModal";

class SingsCmp extends React.Component {
    state = {
        openNewSingModal: false,
        editSing: null,
    };

    componentDidMount() {
        this.props.getAllSings();
    }

    render() {
        const { sings } = this.props;

        if (!sings.length) {
            return null;
        }

        return (
            <div className={styles.singsContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Автор</th>
                            <th>Описание</th>
                            <th>Альбом</th>
                            <th/>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        sings.map((sing, index) => {
                            return (
                                <tr key={sing.ID}>
                                    <td>{index+1}</td>
                                    <td>{sing.name}</td>
                                    <td>{sing.author}</td>
                                    <td>{sing.album}</td>
                                    <td>{sing.description}</td>
                                    <td onClick={() => this.setState({
                                        editSing: sing,
                                    })} style={{cursor: 'pointer'}} >Ред.</td>
                                    <td onClick={() => this.props.deleteSing(sing.ID)}
                                        style={{cursor: 'pointer'}}>Удалить</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <div
                    className={styles.addNewSingContainer}
                    onClick={this.changeAddNewModalVisible}
                >+
                </div>
                <NewSingModal
                    visible={this.state.openNewSingModal}
                    closeModal={this.changeAddNewModalVisible}
                />
                {this.state.editSing &&
                    <EditSingModal
                        visible
                        closeModal={() => this.setState({ editSing: undefined })}
                        sing={this.state.editSing}
                    />
                }
            </div>
        );
    }

    changeAddNewModalVisible = () => this.setState({ openNewSingModal: !this.state.openNewSingModal })
}

const mapStateToProps = (state) => ({
    sings: state.sings.sings,
});

const mapDispatchToProps = ({
    getAllSings,
    addNewSing,
    editSing,
    deleteSing,
});

export const Sings = connect(mapStateToProps, mapDispatchToProps)(SingsCmp);
