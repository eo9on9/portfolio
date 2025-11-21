import { Product } from '@features/product/model/product'
import { Button } from '@shared/ui/Button'
import { toPrice } from '@shared/util/format'
import { MessageSquare } from 'lucide-react'

interface ProductTableProps {
  data: Product[]
}

export const ProductTable = ({ data }: ProductTableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>판매자</th>
            <th>가격</th>
            <th>수량</th>
            <th>등록시간</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {data.map(product => (
            <tr key={product.id}>
              <td>{product.listedBy}</td>
              <td>{toPrice(product.price)} G</td>
              <td>{product.amount}</td>
              <td>{product.createdAt}</td>
              <td>
                <Button variant="ghost">
                  <MessageSquare className="size-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
