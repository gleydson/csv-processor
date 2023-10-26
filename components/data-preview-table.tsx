import { Card, CardContent } from "./ui/card";

export function DataPreviewTable() {
  return (
    <Card className="focus-visible:ring-ring ring-offset-background flex flex-1 flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-60 bg-gradient-to-r from-green-200 via-green-400 to-primary border-none rounded-lg p-[1px]">
      <CardContent className="bg-card rounded-lg w-full p-4">
        {/* <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table> */}

        <div className="flex-1 flex flex-col justify-center items-center py-20">
          <h3 className="text-muted-foreground text-4xl">Preview data</h3>
          <p className="text-muted-foreground/60 text-lg">For now, see the console when you drop your csv file above</p>
        </div>
      </CardContent>
    </Card>
  )
}