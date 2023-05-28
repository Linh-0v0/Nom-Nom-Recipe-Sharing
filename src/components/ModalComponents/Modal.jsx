import React from 'react'
import ReactDOM from 'react-dom'
import styles from '../../styles/Modal.module.css'
import { Button2 } from '../Button'

const Modal = ({ isShowing, hide, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={styles.modal_overlay} />
          <div
            className={styles.modal_wrapper}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className={styles.modal}>
              <div className={styles.modal_header}>
                <div className={styles.modal_title}>
                  {props.titleIcon}
                  {props.title}
                </div>
                <div>
                  {props.closeable ? (
                    <i
                      className={`${'fa-solid fa-xmark'} ${
                        styles.modal_close_
                      }`}
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={hide}
                    ></i>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className={styles.modal_body}>{props.modalMsg}</div>

              <div className={styles.modal_btnContainer}>
                {props.extraButton}
                <Button2
                  type={'button'}
                  options={props.btnMsg}
                  fn={props.btnFn}
                ></Button2>
              </div>
            </div>
            {props.closeable ? (
              <div className={styles.placeHolder} onClick={hide}></div>
            ) : (
              ''
            )}
          </div>
        </React.Fragment>,
        document.body
      )
    : null

export default Modal
