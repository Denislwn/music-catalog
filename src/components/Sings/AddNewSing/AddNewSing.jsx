import * as React from 'react';

import * as styles from './styles.scss'

export class AddNewSing extends React.Component {
    state = {
      name: '',
      author: '',
      description: '',
      album: '',
    };

    render() {
        return (
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <div className={styles.labels}>
                        <label>Название:</label>
                        <label>Автор:</label>
                        <label>Описание:</label>
                        <label>Альбом:</label>
                    </div>
                    <div className={styles.inputs}>
                        <input onChange={(event) => this.setState({ name: event.target.value })}/>
                        <input onChange={(event) => this.setState({ author: event.target.value })}/>
                        <input onChange={(event) => this.setState({ description: event.target.value })}/>
                        <input onChange={(event) => this.setState({ album: event.target.value })}/>
                    </div>
                </div>
                    <div className={styles.buttons}>
                        <button
                            onClick={this.props.changeAddNewSingMode}
                            style={{marginRight: '16px', marginLeft: '16px'}}
                        >
                            Отменить
                        </button>
                        <button onClick={this.addNewSing}>
                            Добавить
                        </button>
                    </div>
            </div>
        )
    }

    addNewSing = () => {
        const { name, author, description, album } = this.state;

        this.props.addNewSing({
            name,
            author,
            description,
            album,
        });
        this.props.changeAddNewSingMode();
    }
}
