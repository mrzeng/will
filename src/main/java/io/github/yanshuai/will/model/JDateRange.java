package io.github.yanshuai.will.model;

import org.joda.time.DateTime;

public class JDateRange {

    private DateTime startDateTime;
    private DateTime endDateTime;

    public JDateRange() {
    }

    public JDateRange(DateTime startDateTime, DateTime endDateTime) {
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    public void setStartDateTime(DateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public DateTime getStartDateTime() {
        return startDateTime;
    }

    public void setEndDateTime(DateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public DateTime getEndDateTime() {
        return endDateTime;
    }
}
