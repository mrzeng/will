package io.github.yanshuai.will;

import io.github.yanshuai.will.model.DateTimeRange;
import io.github.yanshuai.will.model.DateTimeRangeFormat;
import java.text.ParseException;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.format.AnnotationFormatterFactory;
import org.springframework.format.Formatter;
import org.springframework.format.Parser;
import org.springframework.format.Printer;

public class DateTimeRangeAnnotationFormatterFactory implements AnnotationFormatterFactory<DateTimeRangeFormat> {

    public Set<Class<?>> getFieldTypes() {
        Set<Class<?>> fieldTypes = new HashSet<Class<?>>();
        fieldTypes.add(DateTimeRange.class);
        return fieldTypes;
    }

    public Printer<?> getPrinter(DateTimeRangeFormat a, Class<?> type) {
        return new DateTimeRangeFormatter(a.pattern(), a.delimiter());
    }

    public Parser<?> getParser(DateTimeRangeFormat a, Class<?> type) {
        return new DateTimeRangeFormatter(a.pattern(), a.delimiter());
    }

    private static class DateTimeRangeFormatter implements Formatter<DateTimeRange> {

        private final String pattern;
        private final String delimiter;

        public DateTimeRangeFormatter(String pattern, String delimiter) {
            this.pattern = pattern;
            this.delimiter = delimiter;
        }

        public String print(DateTimeRange t, Locale locale) {
            StringBuilder sb = new StringBuilder();
            sb.append(t.getStartDateTime().toString(pattern));
            sb.append(delimiter);
            sb.append(t.getEndDateTime().toString(pattern));
            return  sb.toString();
        }

        public DateTimeRange parse(String string, Locale locale) throws ParseException {
            String[] strs = string.split(delimiter);
            DateTimeFormatter format = DateTimeFormat.forPattern(pattern);
            DateTime startDateTime = format.parseDateTime(strs[0]);
            DateTime endDateTime = format.parseDateTime(strs[1]);
            return new DateTimeRange(startDateTime, endDateTime);
        }
    }
}
