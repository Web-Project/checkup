<?php

namespace Application\Controller\Plugin;



class Report extends Service\Report
{
	public function printSalesARInvoice($data, $fileName)
	{	

		$headers = array(
			array(
				"label" => "Item Code",
				"width" => 25,
				"align" => "C"
			),
			array(
				"label" => "Description",
				"width" => 64,
				"align" => "L"
			),
			array(
				"label" => "Qty",
				"width" => 15,
				"align" => "R"
			),
			array(
				"label" => "UoM",
				"width" => 20,
				"align" => "L"
			),
			array(
				"label" => "Qty/UoM",
				"width" => 20,
				"align" => "R"
			),
			array(
				"label" => "% Dscnt",
				"width" => 20,
				"align" => "R"
			),
			array(
				"label" => "Gross Total",
				"width" => 30,
				"align" => "R"
			)
		);

		$salesInvoice = $data['salesInvoice'];
		$salesItems = $data['salesInvoiceItems'];

		$adapter = $this->getAdapter();

		$adapter->AliasNbPages();
		$adapter->AddPage();

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(28,5 , 'Customer Code:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(118,5 , $salesInvoice['customerCode'], 0,0);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(23,5 , 'Posting Date:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , $salesInvoice['postingDate'], 0,1);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(28,5 , 'Customer Name:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(118,5 , $salesInvoice['customerName'],0,0);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(23,5 , 'Doc. No.:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , $salesInvoice['docId'], 0,1);

	   	$adapter->SetFont('Helvetica','B',9);

	   	$adapter->Ln();

	   	foreach ($headers as $header) {
	   		$adapter->Cell($header['width'],5 , $header['label'], 0,0, $header['align']);
	   	}

	   	$adapter->Ln();
	   	$adapter->SetFont('Helvetica','',9);
	   	foreach ($salesItems as  $salesItem) {
	   		$adapter->Cell($headers[0]['width'],5 , $salesItem['itemCode'], 0,0, $headers[0]['align']);
	   		$adapter->Cell($headers[1]['width'],5 , $salesItem['description'], 0,0, $headers[1]['align']);
	   		$adapter->Cell($headers[2]['width'],5 , number_format($salesItem['qty'],2), 0,0, $headers[2]['align']);
	   		$adapter->Cell($headers[3]['width'],5 , $salesItem['saleUoM'], 0,0, $headers[3]['align']);
	   		$adapter->Cell($headers[4]['width'],5 , number_format($salesItem['qtyPrSaleUoM'],2), 0,0, $headers[4]['align']);
	   		$adapter->Cell($headers[5]['width'],5 , number_format($salesItem['prcntDscnt'],2), 0,0, $headers[5]['align']);
	   		$adapter->Cell($headers[6]['width'],5 , number_format($salesItem['rowGrossTotal'],2), 0,1, $headers[6]['align']);
	   		
	   	}

	   	$adapter->Ln();

	   	$y = $adapter->GetY();

	   	$adapter->Line(10, $y, 80, $y);
	   	$adapter->Line(135, $y, 205, $y);

	   	$adapter->Ln();

	   	$y = $adapter->GetY();

	   	$adapter->MultiCell(70, 5, $salesInvoice['remarks2'], 0, 'L');

	   	$adapter->SetXY(155, $y);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(25,5 , 'Total % Disc.:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , number_format($salesInvoice['totalPrcntDscnt'], 2), 0,1, 'R');

	   	$y = $adapter->GetY();
	   	$adapter->SetXY(155, $y);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(25,5 , 'Total Amt Disc.:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , number_format($salesInvoice['totalAmtDscnt'], 2), 0,1, 'R');

	   	$y = $adapter->GetY();
	   	$adapter->SetXY(155, $y);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(25,5 , 'Net Total:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , number_format($salesInvoice['netTotal'], 2), 0,1, 'R');

	   	$y = $adapter->GetY();
	   	$adapter->SetXY(155, $y);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(25,5 , 'Gross Total:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , number_format($salesInvoice['grossTotal'], 2), 0,1, 'R');
	   	

	    $adapter->Output( $fileName.'.pdf', 'I');
	}

	public function printSalesReturn($data, $fileName)
	{	

		$headers = array(
			array(
				"label" => "Item Code",
				"width" => 25,
				"align" => "C"
			),
			array(
				"label" => "Description",
				"width" => 64,
				"align" => "L"
			),
			array(
				"label" => "Qty",
				"width" => 15,
				"align" => "R"
			),
			array(
				"label" => "UoM",
				"width" => 20,
				"align" => "L"
			),
			array(
				"label" => "Qty/UoM",
				"width" => 20,
				"align" => "R"
			),
			array(
				"label" => "% Dscnt",
				"width" => 20,
				"align" => "R"
			),
			array(
				"label" => "Gross Total",
				"width" => 30,
				"align" => "R"
			)
		);

		$salesReturn = $data['salesReturn'];
		$salesItems = $data['salesReturnItems'];

		$adapter = $this->getAdapter();

		$adapter->AliasNbPages();
		$adapter->AddPage();

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(28,5 , 'Customer Code:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(118,5 , $salesReturn['customerCode'], 0,0);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(23,5 , 'Posting Date:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , $salesReturn['postingDate'], 0,1);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(28,5 , 'Customer Name:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(118,5 , $salesReturn['customerName'],0,0);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(23,5 , 'Doc. No.:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , $salesReturn['docId'], 0,1);

	   	$adapter->SetFont('Helvetica','B',9);

	   	$adapter->Ln();

	   	foreach ($headers as $header) {
	   		$adapter->Cell($header['width'],5 , $header['label'], 0,0, $header['align']);
	   	}

	   	$adapter->Ln();
	   	$adapter->SetFont('Helvetica','',9);
	   	foreach ($salesItems as  $salesItem) {
	   		$adapter->Cell($headers[0]['width'],5 , $salesItem['itemCode'], 0,0, $headers[0]['align']);
	   		$adapter->Cell($headers[1]['width'],5 , $salesItem['description'], 0,0, $headers[1]['align']);
	   		$adapter->Cell($headers[2]['width'],5 , number_format($salesItem['qty'],2), 0,0, $headers[2]['align']);
	   		$adapter->Cell($headers[3]['width'],5 , $salesItem['saleUoM'], 0,0, $headers[3]['align']);
	   		$adapter->Cell($headers[4]['width'],5 , number_format($salesItem['qtyPrSaleUoM'],2), 0,0, $headers[4]['align']);
	   		$adapter->Cell($headers[5]['width'],5 , number_format($salesItem['prcntDscnt'],2), 0,0, $headers[5]['align']);
	   		$adapter->Cell($headers[6]['width'],5 , number_format($salesItem['rowGrossTotal'],2), 0,1, $headers[6]['align']);
	   		
	   	}

	   	$adapter->Ln();

	   	$y = $adapter->GetY();

	   	$adapter->Line(10, $y, 80, $y);
	   	$adapter->Line(135, $y, 205, $y);

	   	$adapter->Ln();

	   	$y = $adapter->GetY();

	   	$adapter->MultiCell(70, 5, $salesReturn['remarks2'], 0, 'L');

	   	$adapter->SetXY(155, $y);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(25,5 , 'Total % Disc.:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , number_format($salesReturn['totalPrcntDscnt'], 2), 0,1, 'R');

	   	$y = $adapter->GetY();
	   	$adapter->SetXY(155, $y);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(25,5 , 'Total Amt Disc.:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , number_format($salesReturn['totalAmtDscnt'], 2), 0,1, 'R');

	   	$y = $adapter->GetY();
	   	$adapter->SetXY(155, $y);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(25,5 , 'Net Total:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , number_format($salesReturn['netTotal'], 2), 0,1, 'R');

	   	$y = $adapter->GetY();
	   	$adapter->SetXY(155, $y);

	   	$adapter->SetFont('Helvetica','B',9);
	   	$adapter->Cell(25,5 , 'Gross Total:', 0,0);
	   	$adapter->SetFont('Helvetica','',9);
	   	$adapter->Cell(25,5 , number_format($salesReturn['grossTotal'], 2), 0,1, 'R');
	   	

	    $adapter->Output( $fileName.'.pdf', 'I');
	}
}