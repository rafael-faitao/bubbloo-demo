import "./ActivityBar.scss";

export default function ActivityBar ({onClose}) {
    return (
        <div className="activity-bar">
            <img className="action-item trans-all hv-light" src="/assets/img/exit-activity-bar.svg" onClick={() => onClose()}/>
            <img className="action-item trans-all hv-light" src="/assets/img/note-activity-bar.svg"/>
            <div className="avatar-group">
                <span>Miguel</span>
                <img src="/assets/img/avatar-group.png" />
            </div>
        </div>
    )
}