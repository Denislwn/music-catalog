import * as React from 'react'
import { connect } from 'react-redux'

import * as styles from './styles.scss'

import { getAllSings, addNewSing, editSing, deleteSing } from "../../AC/sings";
import {AddNewSing} from "./AddNewSing/AddNewSing";
import {EditSing} from "./EditSing/EditSing";

class SingsCmp extends React.Component {
    state = {
      isNewSingMode: false,
      editId: null,
    };

    componentDidMount() {
        this.props.getAllSings();
    }

    render() {
        const { sings } = this.props;
        const { isNewSingMode } = this.state;

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
                            if (this.state.editId === sing.ID) {
                                return (
                                    <EditSing
                                        key={sing.ID}
                                        sing={sing}
                                        index={index}
                                        editSing={this.props.editSing}
                                        reset={() => this.setState({ editId: null })}
                                    />
                                )
                            }
                            return (
                                <tr key={sing.ID}>
                                    <td>{index+1}</td>
                                    <td>{sing.name}</td>
                                    <td>{sing.author}</td>
                                    <td>{sing.album}</td>
                                    <td>{sing.description}</td>
                                    <td onClick={() => this.setState({
                                        editId: sing.ID,
                                    })} style={{cursor: 'pointer'}} >Ред.</td>
                                    <td onClick={() => this.props.deleteSing(sing.ID)}
                                        style={{cursor: 'pointer'}}>Удалить</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                    {
                        isNewSingMode ?
                            <AddNewSing
                                addNewSing={this.props.addNewSing}
                                changeAddNewSingMode={this.changeAddNewSingMode}
                            /> :
                            <div
                                className={styles.addNewSingContainer}
                                onClick={this.changeAddNewSingMode}
                            >+
                            </div>
                    }
            </div>
        );
    }

    changeAddNewSingMode = () => this.setState({ isNewSingMode: !this.state.isNewSingMode })
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
