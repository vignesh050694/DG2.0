package com.datagreen.report.util;

import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.io.source.ByteArrayOutputStream;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public abstract class PdfWriter {
    private static DecimalFormat df = new DecimalFormat("#.##");

    public static ByteArrayOutputStream downloadPDF(List<Map<String, Object>> details, List<String> headers) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append("<table style='width:100%;'>");
        stringBuilder.append("<thead style='color: white; padding-top: 12px; padding-bottom: 12px; text-align: left;'>");
        stringBuilder.append("<tr style='background-color:#04AA6D;'>");
        stringBuilder.append("<td style='padding:10px'>#</td>");
        headers.forEach(key -> {
            stringBuilder.append("<td style='padding:10px'>" + key + "</td>");
        });
        stringBuilder.append("</tr>");

        stringBuilder.append("</thead>");
        stringBuilder.append("<tbody>");
        AtomicInteger ai = new AtomicInteger(1);
        details.forEach(data ->{
            if(ai.get() % 2 == 0) {
                stringBuilder.append("<tr>");
            }else{
                stringBuilder.append("<tr style='background-color: #f2f2f2'>");
            }
            stringBuilder.append("<td style='padding:10px'> "+ai.getAndIncrement()+" </td>");
            for (String header : headers) {
                stringBuilder.append("<td style='padding:10px'>");
                stringBuilder.append(data.get(header) == null ? ""  : data.get(header));
                stringBuilder.append("</td>");
            }
            stringBuilder.append("</tr>");
        });
        stringBuilder.append("</tbody>");
        stringBuilder.append("</table>");

        HtmlConverter.convertToPdf(stringBuilder.toString(), out);
        return out;
    }
}
