package com.datagreen.report.util;

import com.itextpdf.io.source.ByteArrayOutputStream;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Picture;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public abstract class ExcelWriter {
    private static DecimalFormat df = new DecimalFormat("#.##");

    private static final short TWIPS_PER_PIEXL = 15;

    public static ByteArrayOutputStream downloadExcel(List<Map<String, Object>> details, List<String> headers) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("datagreen");
        InputStream is = null;
        URL logoUrl = new URL("https://www.sourcetrace.com/wp-content/themes/sts-v3/img/customers/laudes-foundation.jpg");
        try {
            getHeader(workbook, sheet, logoUrl, headers);
            AtomicInteger rowCount = new AtomicInteger(6);

            Font dataFont = workbook.createFont();
            dataFont.setBold(false);
            dataFont.setColor(Font.COLOR_NORMAL);
            dataFont.setFontHeightInPoints((short) 13);
            dataFont.setItalic(false);

            CellStyle style = workbook.createCellStyle();
            style.setFont(dataFont);
            style.setBorderBottom(BorderStyle.THIN);
            style.setBorderTop(BorderStyle.THIN);
            style.setBorderRight(BorderStyle.THIN);
            style.setBorderLeft(BorderStyle.THIN);

            details.forEach(data ->{
                Row cellRow = sheet.createRow(rowCount.getAndIncrement());
                cellRow.setHeight(pixel2PoiHeight(40));
                int cellCount = 0;
                for (String header : headers) {
                    Cell cell = cellRow.createCell(cellCount++);
                    cell.setCellValue(data.get(header) == null ? ""  : data.get(header).toString());
                    cell.setCellStyle(style);
                }
            });

            Integer cellCount = 0;
            for(String header : headers){
                sheet.setColumnWidth(cellCount++, (30 * 256) + 200);
            }
            workbook.write(out);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            out.close();
        }
        return out;
    }

    private static void getHeader(XSSFWorkbook workbook, XSSFSheet sheet, URL logoUrl, List<String> headers) throws IOException {
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setColor(Font.COLOR_NORMAL);
        headerFont.setFontHeightInPoints((short) 18);
        headerFont.setItalic(false);

        CellStyle style = workbook.createCellStyle();
        style.setFont(headerFont);
        style.setBorderBottom(BorderStyle.MEDIUM);
        style.setBorderTop(BorderStyle.MEDIUM);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderLeft(BorderStyle.MEDIUM);

        Font rowHeaderFont = workbook.createFont();
        rowHeaderFont.setBold(true);
        rowHeaderFont.setColor(Font.COLOR_NORMAL);
        rowHeaderFont.setFontHeightInPoints((short) 14);
        rowHeaderFont.setItalic(false);

        CellStyle rowHeaderStyle = workbook.createCellStyle();
        rowHeaderStyle.setFont(rowHeaderFont);
        rowHeaderStyle.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.index);
        rowHeaderStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        rowHeaderStyle.setBorderBottom(BorderStyle.MEDIUM);
        rowHeaderStyle.setBorderTop(BorderStyle.MEDIUM);
        rowHeaderStyle.setBorderRight(BorderStyle.MEDIUM);
        rowHeaderStyle.setBorderLeft(BorderStyle.MEDIUM);

        //setLogo(workbook, sheet, logoUrl);

        Row reportRow = sheet.createRow(2);
        reportRow.setHeight(pixel2PoiHeight(50));

        Cell reportCell = reportRow.createCell(3);
        reportCell.setCellValue("Datagreen Report 2.0");
        reportCell.setCellStyle(style);

        AtomicInteger rowCount = new AtomicInteger(5);
        Integer cellCount = 0;
        for(String header : headers){
            Row headerRow = sheet.createRow(rowCount.get());
            headerRow.setHeight(pixel2PoiHeight(30));

            Cell cell = headerRow.createCell(cellCount++);
            cell.setCellValue(header);
            cell.setCellStyle(rowHeaderStyle);
        }

    }

    private static void setLogo(XSSFWorkbook workbook, XSSFSheet sheet, URL logoUrl) throws IOException {
        InputStream is;
        is = logoUrl.openStream();
        byte[] bytes = IOUtils.toByteArray(is);
        int pictureIdx = workbook.addPicture(bytes, Workbook.PICTURE_TYPE_PNG);
        is.close();
        CreationHelper helper = workbook.getCreationHelper();
        Drawing drawing = sheet.createDrawingPatriarch();
        ClientAnchor anchor = helper.createClientAnchor();
        anchor.setCol1(1); //Column B
        anchor.setRow1(2); //Row 3
        anchor.setCol2(2); //Column C
        anchor.setRow2(3);

        int firstRow = 1;
        int lastRow = 3;
        int firstCol = 1;
        int lastCol = 4;

        sheet.addMergedRegion(new CellRangeAddress(firstRow, lastRow, firstCol, lastCol));

        Picture pict = drawing.createPicture(anchor, pictureIdx);

        Cell cell = sheet.createRow(2).createCell(1);
    }

    public static short pixel2PoiHeight (int pixel) {
        return (short) (pixel * TWIPS_PER_PIEXL);
    }

}
