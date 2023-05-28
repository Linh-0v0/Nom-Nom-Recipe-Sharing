import styles from '../styles/DietCard.module.css'
import React from 'react'

class DietCardContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDivClick = this.handleDivClick.bind(this)
  }

  componentDidMount() {
    const { data, title } = this.props
    if (data && title && data.includes(title)) {
      this.setState({ isChecked: true })
    }
  }

  handleDivClick() {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }))
  }

  handleChange(event) {
    this.setState({ isChecked: event.target.checked })
  }

  render() {
    const { isChecked } = this.state
    const checkedValue = isChecked ? 'checked' : ''

    return (
      <div
        id={checkedValue}
        className={`${styles.dietCardContent} ${
          isChecked ? styles.active : ''
        }`}
        onClick={this.handleDivClick}
      >
        <div className={styles.dietCardTitle}>
          <p>{this.props.title}</p>
          <input
            type="checkbox"
            onChange={this.handleChange}
            checked={isChecked}
          />
          {isChecked ? (
            <i className="fa-regular fa-circle-check"></i>
          ) : (
            <i className="fa-regular fa-circle"></i>
          )}
          <span className="checkbox__icon"></span>
        </div>
        <p className={styles.DescriptionLabel}>{this.props.description}</p>
      </div>
    )
  }
}

class DietCard extends React.Component {
  render() {
    return (
      <div
        className={`${styles.dietCard} ${
          this.props.active ? styles.active : ''
        }`}
      >
        <DietCardContent
          title={this.props.title}
          description={this.props.description}
          category={this.props.category}
          data={this.props.data}
        />
      </div>
    )
  }
}

DietCard.defaultProps = {
  title: 'Long term',
  category: ['Plans'],
  description: 'Create a vision. To get started, imagine your life.',
  active: false
}

export default DietCard
