import { Request, Response } from 'express'
import axios from 'axios'
import crypto from 'crypto'
import qs from 'qs'

const getPayments = async (req: Request, res: Response) => {
  const user_id = req.jwtDecoded.id
}

const paymentController = { getPayments }

export default paymentController
